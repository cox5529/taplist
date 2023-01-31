import { Timestamp } from 'firebase/firestore';

export function toDateString(date: string | Date | Timestamp): string {
  const format = new Intl.DateTimeFormat('en-US');
  if (date instanceof Date) {
    return format.format(date);
  }

  if (date instanceof Timestamp) {
    return format.format(date.toDate());
  }

  return format.format(new Date(date));
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
