import { FC, useState } from 'react';

import { Button, Modal } from '@/components/atoms';
import {
  ButtonCharacterAvatar,
  CharacterForm,
  CharacterFormData,
} from '@/components/molecules';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { useCheckedValues } from '@/hooks';
import { LocalStorageService } from '@/api';

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
  const dispatch = useAppDispatch();
  const { checkedValues, onCheckedClick } = useCheckedValues(currentCharacters);
  const [windowType, setWindowType] = useState<'add' | 'create'>('add');
  const isLoading = useAppSelector(
    StoreSelectors.characterList.selectIsLoading,
  );
  const characters = useAppSelector(StoreSelectors.characterList.selectData);

  const onSaveClick = () => {
    onSave(checkedValues);
    onClose();
  };

  const onSuccessSubmit = async (data: CharacterFormData, imageFile: File) => {
    await dispatch(
      StoreActions.characterList.createCharacter({
        character: {
          userUid: LocalStorageService.getUID(),
          ...data,
        },
        imageFile,
      }),
    );
    setWindowType('add');
  };

  if (characters)
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          windowType === 'add' ? 'Добавление персонажей' : 'Создание персонажа'
        }
      >
        {windowType === 'add' && (
          <>
            <div className={style.body}>
              <div className={style.characters}>
                {characters.map((item) => (
                  <ButtonCharacterAvatar
                    character={item}
                    checked={
                      !!checkedValues.find((subItem) => subItem === item.id)
                    }
                    onClick={onCheckedClick}
                  />
                ))}
              </div>
              <div className={style.buttons}>
                <Button onClick={onSaveClick} fullwidth>
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  fullwidth
                  onClick={() => setWindowType('create')}
                >
                  Создать нового
                </Button>
              </div>
            </div>
          </>
        )}

        {windowType === 'create' && (
          <CharacterForm
            formType="create"
            onCancel={() => setWindowType('add')}
            onSuccessSubmit={onSuccessSubmit}
            isLoading={isLoading}
          />
        )}
      </Modal>
    );
};

export { AddCharacterToDream };
