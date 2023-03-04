import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export function toDateString(date: string | Date | Timestamp, inPast = true): string {
  let other;
  if (date instanceof Date) {
    other = moment(date);
  } else if (date instanceof Timestamp) {
    other = moment(date.toDate());
  } else {
    other = moment(date);
  }

  return moment().diff(other, 'd') + ' days' + (inPast ? ' ago' : '');
}

export function toISODateString(input: string | Date | Timestamp): string {
  let date: Date;
  if (input instanceof Date) {
    date = input;
  } else   if (input instanceof Timestamp) {
    date = input.toDate();
  } else {
    date = new Date(input);
  }

  return date.toISOString().split('T')[0];
}
