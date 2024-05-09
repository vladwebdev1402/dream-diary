import { DreamCardSkeleton } from '../DreamCard';
import style from './style.module.scss';
const DreamListSkeleton = () => {
  return (
    <div className={style.list}>
      <DreamCardSkeleton withCharacters withLabels />
      <DreamCardSkeleton withLabels />
      <DreamCardSkeleton withCover />
    </div>
  );
};

export { DreamListSkeleton };
