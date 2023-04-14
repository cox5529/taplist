import * as functions from 'firebase-functions';

export const syncFromBrewfather = functions.pubsub.schedule('every 5 minutes').onRun(() => {
  console.log('Run');
});
