import { calcTimestampDate } from '@/helpers';
import { Dream } from '@/types';

const groupByTimestamp = (dreams: Dream[] | null): Record<string, Dream[]> => {
  if (dreams === null) return {};
  const sortDreams = [...dreams].sort(
    (a, b) => b.date.seconds - a.date.seconds,
  );
  const groupedDreams: Record<string, Dream[]> = {};

  sortDreams.forEach((dream) => {
    const date = calcTimestampDate(dream.date).toString();
    if (groupedDreams[date] === undefined) {
      groupedDreams[date] = [dream];
      return;
    }
    groupedDreams[date].push(dream);
  });

  return groupedDreams;
};

export { groupByTimestamp };
