import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Button, Input, ThemeButton } from '@/components/atoms';
import { FormProps, LabelFormData, LabelTheme } from '@/types';

import style from './style.module.scss';
import { themes } from './data';

const LabelForm: FC<FormProps<LabelFormData>> = ({
  defaultValue = {
    name: '',
    theme: 'gray',
  },
  formType,
  isLoading = false,
  onCancel,
  onSuccessSubmit = () => {},
}) => {
  const [formData, setFormData] = useState<LabelFormData>(defaultValue);
  const [nameError, setNameError] = useState('');

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onThemeClick = (theme: LabelTheme) => {
    setFormData({ ...formData, theme: theme });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name === '')
      setNameError('Поле необходимо обязательно заполнить');
    else {
      setNameError('');
      onSuccessSubmit(formData);
    }
  };

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <Input
        label="Название тега"
        value={formData.name}
        onChange={onNameChange}
        error={nameError}
      />
      <div className={style.themes}>
        {themes.map((item) => (
          <ThemeButton
            key={item}
            theme={item}
            checked={item === formData.theme}
            onClick={() => onThemeClick(item)}
          />
        ))}
      </div>
      <div className={style.buttons}>
        <Button type="submit" fullwidth isLoading={isLoading}>
          {formType === 'edit' ? 'Редактировать' : 'Создать'}
        </Button>
        <Button type="button" variant="outlined" fullwidth onClick={onCancel}>
          Вернуться назад
        </Button>
      </div>
    </form>
  );
};

export { LabelForm };
