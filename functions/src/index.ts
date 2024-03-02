import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import fetch from 'node-fetch';

import { Beer } from './models/beer';
import { BrewfatherBatch } from './models/brewfather-batch';
import { BrewfatherBatchDetails } from './models/brewfather-batch-details';

const brewfatherUserId = defineSecret('BREWFATHER_USER_ID');
const brewfatherApiKey = defineSecret('BREWFATHER_API_KEY');

const db = getFirestore(initializeApp());

export const syncFromBrewfather = functions
  .runWith({ secrets: [brewfatherApiKey, brewfatherUserId] })
  .pubsub.schedule('every 5 minutes')
  .onRun(async () => {
    const recipes = await getBrewfatherBatches();
    const beers: Beer[] = recipes.map((x) => ({
      brewfatherId: x._id,
      abv: x.measuredAbv ?? x.recipe.abv,
      srm: x.estimatedColor,
      ibu: x.estimatedIbu,
      originalGravity: x.measuredOg ?? x.estimatedOg,
      finalGravity: x.measuredFg ?? x.estimatedFg,
      name: `${x.recipe.name} (Batch #${x.batchNo})`,
      style: `${x.recipe.style.name} - ${x.recipe.style.category} (${x.recipe.style.categoryNumber}${x.recipe.style.styleLetter})`,
      description: x.tasteNotes ?? '',
      brewDate: getDateString(x.brewDate),
      packageDate: getDateString(x.bottlingDate),
      calories: Math.floor(x.recipe.nutrition.calories.total * 3.5),
      type: 'packaged',
    }));

    const storedBeers = await db
      .collection('beer')
      .get()
      .then((x) => x.docs.map((d) => ({ id: d.id, ...d.data() } as Beer)));
    
    for (const storedBeer of storedBeers) {
      const brewfatherBeer = beers.find(x => x.brewfatherId === storedBeer.brewfatherId);
      if (brewfatherBeer) {
        continue;
      }

      console.log(`Removing beer ${storedBeer.name} - ${storedBeer.style} from Firestore`);
      await db.collection('beer').doc(storedBeer.id ?? '').delete();
    }

    for (const brewfatherBeer of beers) {
      const stored = storedBeers.find((x) => x.brewfatherId === brewfatherBeer.brewfatherId);
      if (!stored) {
        console.log(`Adding beer ${brewfatherBeer.name} - ${brewfatherBeer.style} to Firestore`);
        await db.collection('beer').add(brewfatherBeer);
        continue;
      }

      const id = stored.id;
      const beer: Beer = {
        ...stored,
        ...brewfatherBeer,
      };

      console.log(`Updating beer ${brewfatherBeer.name} - ${brewfatherBeer.style} in Firestore`);
      await db.doc(`beer/${id}`).set(beer);
    }
  });

const getDateString = (timestamp: number): string => {
  return new Date(timestamp).toISOString();
};

const getBrewfatherBatches = async (): Promise<BrewfatherBatchDetails[]> => {
  const recipeList = await getBrewfatherBatchList();
  return await Promise.all(recipeList.map((x) => getBrewfatherBatchDetails(x._id)));
};

const getBrewfatherBatchDetails = async (id: string): Promise<BrewfatherBatchDetails> =>
  await request(`https://api.brewfather.app/v2/batches/${id}`);

const getBrewfatherBatchList = async (): Promise<BrewfatherBatch[]> =>
  await request('https://api.brewfather.app/v2/batches?order_by=brewDate&order_by_direction=desc&status=Completed');

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, {
    method: 'get',
    headers: {
      Authorization: getAuthHeader(),
    },
  });

  return await response.json();
};

const getAuthHeader = (): string => {
  const userId = brewfatherUserId.value();
  const key = brewfatherApiKey.value();

  return 'Basic ' + Buffer.from(`${userId}:${key}`).toString('base64');
};
