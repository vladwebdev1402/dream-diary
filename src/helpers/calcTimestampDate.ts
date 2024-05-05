import { Timestamp } from '@/types';

const calcTimestampDate = (timestamp: Timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

export { calcTimestampDate };
