import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

import {
  AddCharacterButton,
  AddTagButton,
  CharacterAvatar,
  CharacterAvatarListSkeleton,
  ImageLoader,
  Input,
  LabelListSkeleton,
  Textarea,
} from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { FormButtons, LabelCard } from '@/components/molecules';
import { DreamFormData, DreamFormErros, FormProps } from '@/types';
import { LocalStorageService, uploadFirebaseImage } from '@/api';

import style from './style.module.scss';
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
    date: Timestamp.fromDate(new Date()),
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

  const onCoverClear = () => {
    setFormData({ ...formData, cover: '' });
  };

  const onCoverChange = (file: File) => {
    uploadFirebaseImage(file);
    setFormData({ ...formData, cover: URL.createObjectURL(file) });
  };

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
    if (characters === null)
      dispatch(
        StoreActions.characterList.getAllCharacters(
          LocalStorageService.getUID(),
        ),
      );
    if (labels === null)
      dispatch(
        StoreActions.labelsList.getAllLabels(LocalStorageService.getUID()),
      );
  }, [characters, labels, LocalStorageService.getUID()]);

  return (
    <>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.avatar}>
          <ImageLoader
            currentSrc={formData.cover}
            onFileChange={onCoverChange}
            onClear={onCoverClear}
          />
        </div>
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
          {characters === null && <CharacterAvatarListSkeleton />}
          {characters &&
            formData.characters &&
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
          {labels === null && <LabelListSkeleton count={5} />}
          {labels &&
            formData.labels &&
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
