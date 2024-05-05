import { StoreSelectors, useAppSelector } from '@/store';

import style from './style.module.scss';
import { CharacterCard } from '../CharacterCard';

const CharacterList = () => {
  const data = useAppSelector(StoreSelectors.characterList.selectData);

  return (
    <div className={style.list}>
      {data.map((item) => (
        <CharacterCard key={item.id} character={item} />
      ))}
    </div>
  );
};

export { CharacterList };
