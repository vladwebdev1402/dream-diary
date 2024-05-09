import { FC } from 'react';

import { Button, Modal } from '@/components/atoms';
import { ButtonCharacterAvatar } from '@/components/molecules';
import { StoreSelectors, useAppSelector } from '@/store';
import { useCheckedValues } from '@/hooks';

import style from './style.module.scss';

type Props = {
  isOpen: boolean;
  currentCharacters: string[];
  onClose(): void;
  onSave(characters: string[]): void;
};

const AddCharacterToDream: FC<Props> = ({
  isOpen,
  currentCharacters,
  onSave,
  onClose,
}) => {
  const { checkedValues, onCheckedClick } = useCheckedValues(currentCharacters);

  const characters = useAppSelector(StoreSelectors.characterList.selectData);

  const onSaveClick = () => {
    onSave(checkedValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавление персонажей">
      <div className={style.body}>
        <div className={style.characters}>
          {characters.map((item) => (
            <ButtonCharacterAvatar
              character={item}
              checked={!!checkedValues.find((subItem) => subItem === item.id)}
              onClick={onCheckedClick}
            />
          ))}
        </div>
        <div className={style.buttons}>
          <Button onClick={onSaveClick} fullwidth>
            Сохранить
          </Button>
          <Button variant="outlined" fullwidth>
            Создать нового
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { AddCharacterToDream };
