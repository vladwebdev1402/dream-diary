import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Textarea } from '@/components/atoms';
import { ROUTER_PATHS } from '@/constants';

import style from './style.module.scss';

const CharacterForm = () => {
  const navigate = useNavigate();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onCancelClick = () => {
    navigate(ROUTER_PATHS.characters);
  };
  return (
    <form className={style.form} onSubmit={onFormSubmit}>
      <div className={style.avatar}>добавить аватар</div>
      <div className={style.inputs}>
        <Input label="Имя персонажа" placeholder="Джульетта" />
        <Textarea
          label="Описание персонажа"
          placeholder="Этот персонаж был одним из тех, кто любит жизнь"
        />
      </div>
      <div className={style.buttons}>
        <Button type="submit" fullwidth>
          Создать
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={onCancelClick}
          fullwidth
        >
          Вернуться назад
        </Button>
      </div>
    </form>
  );
};

export { CharacterForm };
