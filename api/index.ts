import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import net from 'net';

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

const app = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(app);

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

const handleHardwareData = async (ip: string, pin: string, value: string): Promise<void> => {
  let keg = await db
    .doc(`scales/${ip}`)
    .get()
    .then((x) => x.data());
  if (!keg) {
    keg = {
      isPouring: false,
      lastPour: 0,
      ouncesRemaining: 0,
      percentFull: 0,
      totalVolume: 640,
    };
  }

  if (pin === '47') {
    keg.lastPour = parseFloat(value.substring(0, value.length - 1)) * 33.814;
  } else if (pin === '49') {
    keg.isPouring = value === '255';
  } else if (pin === '51') {
    keg.ouncesRemaining = parseFloat(value) * 33.814;
    keg.percentFull = (keg.ouncesRemaining / keg.totalVolume) * 100;
  }

  db.doc(`scales/${ip}`).set(keg);
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
  socket.on('data', (data) => {
    const message = parse(data);

    if (message.type === MessageTypes.Authentication) {
      socket.write(Buffer.from([0, 0, 1, 0, 200]));
    } else if (message.type === MessageTypes.Ping) {
      socket.write(Buffer.from([0, Math.floor(message.id / 256), message.id % 256, 0, 200]));
    } else if (message.type === MessageTypes.Hardware && message.bodyText?.length === 3) {
      handleHardwareData(socket.remoteAddress ?? '', message.bodyText[1], message.bodyText[2]);
    }
  });
});

server.listen(80, '0.0.0.0');
