import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import {
  AddCharacterButton,
  AddTagButton,
  CharacterAvatar,
  Input,
  Textarea,
} from '@/components/atoms';
import { FormButtons, LabelCard } from '@/components/molecules';
import { DreamFormData, DreamFormErros, FormProps } from '@/types';
import { myUID } from '@/constants';

import style from './style.module.scss';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { AddCharacterToDream } from '../AddCharacterToDream';
import { AddLabelToDream } from '../AddLabelToDream';

const DreamForm: FC<FormProps<DreamFormData>> = ({
  formType,
  onCancel,
  defaultValue = {
    name: '',
    description: '',
    cover: '',
    characters: [],
    labels: [],
    date: new Date(),
  },
  isLoading,
  onSuccessSubmit,
}) => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(StoreSelectors.characterList.selectData);
  const labels = useAppSelector(StoreSelectors.labelsList.selectData);
  const [isOpenCharacters, setIsOpenCharacters] = useState(false);
  const [isOpenLabels, setIsOpenLabels] = useState(false);
  const [formData, setFormData] = useState<DreamFormData>(defaultValue);
  const [formErrors, setFormErrors] = useState<DreamFormErros>(null);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const onCharactersSave = (data: string[]) => {
    setFormData({ ...formData, characters: data });
  };

  const onLabelsSave = (data: string[]) => {
    setFormData({ ...formData, labels: data });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: DreamFormErros = null;

    if (formData.name === '')
      errors = { name: 'Поле необходимо обязательно заполнить' };
    if (formData.description === '')
      errors = {
        ...errors,
        description: 'Поле необходимо обязательно заполнить',
      };
    setFormErrors(errors);
    if (errors === null) onSuccessSubmit && onSuccessSubmit(formData);
  };

  useEffect(() => {
    if (characters.length === 0)
      dispatch(StoreActions.characterList.getAllCharacters(myUID));
    if (labels.length === 0)
      dispatch(StoreActions.labelsList.getAllLabels(myUID));
  }, [characters, labels, myUID]);

  return (
    <>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.avatar} />
        <div className={style.inputs}>
          <Input
            label="Название сна"
            onChange={onNameChange}
            value={formData.name}
            placeholder="Проклятый старый дом"
            error={(formErrors && formErrors.name) || ''}
          />
          <Textarea
            label="Описание сна"
            placeholder="Я очень много-много лет мечтаю только о еде. Мне слишком тесно взаперти. И я мечта об одном. Скорей свободу обрести"
            onChange={onDescriptionChange}
            value={formData.description}
            error={(formErrors && formErrors.description) || ''}
          />
        </div>
        <div className={style.characters}>
          {formData.characters &&
            formData.characters.map((item) => {
              const character = characters.find(
                (subitem) => subitem.id === item,
              );
              return character ? (
                <CharacterAvatar key={character.id} character={character} />
              ) : null;
            })}
          <AddCharacterButton onClick={() => setIsOpenCharacters(true)} />
        </div>
        <div className={style.labels}>
          {formData.labels &&
            formData.labels.map((item) => {
              const label = labels.find((subitem) => subitem.id === item);
              return label ? <LabelCard key={label.id} label={label} /> : null;
            })}
          <AddTagButton onClick={() => setIsOpenLabels(true)} />
        </div>
        <FormButtons
          formType={formType}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </form>
      <AddCharacterToDream
        isOpen={isOpenCharacters}
        currentCharacters={formData.characters || []}
        onSave={onCharactersSave}
        onClose={() => setIsOpenCharacters(false)}
      />
      <AddLabelToDream
        currentLabels={formData.labels || []}
        onClose={() => setIsOpenLabels(false)}
        isOpen={isOpenLabels}
        onSave={onLabelsSave}
      />
    </>
  );
};

export { DreamForm };
