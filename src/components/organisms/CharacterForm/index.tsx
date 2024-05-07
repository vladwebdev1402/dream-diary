import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Button, Input, Textarea } from '@/components/atoms';

import style from './style.module.scss';
import { Character, CharacterFormData, CharacterFormErrors } from '@/types';

type Props = {
  defaultValue?: Pick<Character, 'name' | 'description'>;
  formType: 'create' | 'edit';
  isLoading?: boolean;
  onCancel(): void;
  onSuccessSubmit?(data: CharacterFormData): void;
};

const CharacterForm: FC<Props> = ({
  defaultValue = { name: '', description: '' },
  formType,
  isLoading = false,
  onCancel,
  onSuccessSubmit = () => {},
}) => {
  const [formData, setFormData] = useState<CharacterFormData>(defaultValue);
  const [errors, setErrors] = useState<CharacterFormErrors>(null);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name === '')
      setErrors({
        ...errors,
        name: 'Это поле необходимо обязательно заполнить',
      });
    else {
      setErrors(null);
      onSuccessSubmit(formData);
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  return (
    <form className={style.form} onSubmit={onFormSubmit}>
      <div className={style.avatar}>добавить аватар</div>
      <div className={style.inputs}>
        <Input
          label="Имя персонажа"
          placeholder="Джульетта"
          value={formData.name}
          onChange={onNameChange}
          error={errors?.name || ''}
        />
        <Textarea
          label="Описание персонажа"
          placeholder="Этот персонаж был одним из тех, кто любит жизнь"
          value={formData.description}
          onChange={onDescriptionChange}
        />
      </div>
      <div className={style.buttons}>
        <Button type="submit" fullwidth isLoading={isLoading}>
          {formType === 'create' ? 'Создать' : 'Редактировать'}
        </Button>
        <Button variant="outlined" type="button" onClick={onCancel} fullwidth>
          Вернуться назад
        </Button>
      </div>
    </form>
  );
};

export { CharacterForm };
export type { CharacterFormData };
