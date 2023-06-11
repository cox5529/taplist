import { ServiceAccount } from 'firebase-admin';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import net from 'net';

import credential from './credential.json';

type Scale = {
  ip: string;
  ouncesRemaining: number;
  percentFull: number;
  totalVolume: number;
};

enum MessageTypes {
  Ping = 6,
  Hardware = 20,
  Authentication = 29,
}

type Message = {
  type: MessageTypes;
  id: number;
  body: Buffer;
  bodyText?: string[];
};

const kegs: { [key: string]: Scale } = {};

const app = initializeApp({
  credential: cert(credential as ServiceAccount),
});

const db = getFirestore(app);

db.collection('scales')
  .get()
  .then((x) => x.forEach((item) => (kegs[item.id] = item.data() as Scale)));

const parseToStringArray = (body: Buffer): string[] => {
  let s = '';
  const output: string[] = [];
  for (let i = 0; i < body.length; i++) {
    const numericValue = body.readUInt8(i);
    if (numericValue === 0) {
      output.push(s);
      s = '';
    } else {
      s += String.fromCharCode(numericValue);
    }
  }

  if (s !== '') {
    output.push(s);
  }

  return output;
};

const handleHardwareData = async (identifier: string, pin: string, value: string): Promise<void> => {
  let keg = kegs[identifier];
  if (!keg) {
    keg = {
      ip: identifier,
      ouncesRemaining: 0,
      percentFull: 0,
      totalVolume: 640,
    };
  }

  if (pin === '51') {
    const newOunces = parseFloat(value) * 33.814;
    console.info(`Volume received from ${identifier}: ${newOunces}`);

    if (Math.abs(newOunces - keg.ouncesRemaining) < 0.5) {
      return;
    }

    keg.percentFull = (newOunces / keg.totalVolume) * 100;
    keg.ouncesRemaining = newOunces;

    console.info(`Updating scale ${identifier} to`, keg);

    kegs[identifier] = keg;

    db.doc(`scales/${identifier}`).set(keg).catch(console.error);
  }
};

const parse = (data: Buffer): Message => {
  const headerLength = 5;
  const [messageType, messageId, headerData] = [data.readUInt8(0), data.readUInt16BE(1), data.readUInt16BE(3)];
  const body = data.subarray(headerLength, headerData + headerData);

  const message: Message = {
    type: messageType,
    id: messageId,
    body,
  };

  if ([MessageTypes.Hardware].includes(messageType)) {
    message.bodyText = parseToStringArray(body);
  }

  return message;
};

const server = net.createServer((socket) => {
  socket.on('connect', () => {
    console.info(`Connection received from ${socket.remoteAddress}`);
  });

  socket.on('end', () => {
    console.info(`Connection dropped from ${socket.remoteAddress}`);
  });

  socket.on('data', (data) => {
    const message = parse(data);
    let token: string = '';

    if (message.type === MessageTypes.Authentication) {
      token = parseToStringArray(message.body)[0].substring(0, 8);
      console.info(`Authenticated with ${token}`);
      socket.write(Buffer.from([0, 0, 1, 0, 200]));
    } else if (message.type === MessageTypes.Ping) {
      socket.write(Buffer.from([0, Math.floor(message.id / 256), message.id % 256, 0, 200]));
    } else if (message.type === MessageTypes.Hardware && message.bodyText?.length === 3) {
      handleHardwareData(token ?? '', message.bodyText[1], message.bodyText[2]);
    }
  });
});

server.listen(80, '0.0.0.0');
