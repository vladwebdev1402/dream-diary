import { FC } from 'react';
import style from './style.module.scss';
import { Button } from '@/components/atoms';

type Props = {
  formType: 'edit' | 'create';
  isLoading?: boolean;
  onCancel(): void;
};

const FormButtons: FC<Props> = ({ formType, isLoading = false, onCancel }) => {
  return (
    <div className={style.buttons}>
      <Button type="submit" fullwidth isLoading={isLoading}>
        {formType === 'create' ? 'Создать' : 'Редактировать'}
      </Button>
      <Button variant="outlined" type="button" onClick={onCancel} fullwidth>
        Вернуться назад
      </Button>
    </div>
  );
};

export { FormButtons };
