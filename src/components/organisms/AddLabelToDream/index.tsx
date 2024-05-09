import { FC } from 'react';

import { Button, Modal } from '@/components/atoms';
import { StoreSelectors, useAppSelector } from '@/store';
import { useCheckedValues } from '@/hooks';

import style from './style.module.scss';
import { LabelCard } from '@/components/molecules';
import { Label } from '@/types';

type Props = {
  isOpen: boolean;
  currentLabels: string[];
  onClose(): void;
  onSave(labels: string[]): void;
};

const AddLabelToDream: FC<Props> = ({
  currentLabels,
  isOpen,
  onClose,
  onSave,
}) => {
  const { checkedValues, onCheckedClick } = useCheckedValues(currentLabels);

  const labels = useAppSelector(StoreSelectors.labelsList.selectData);

  const onSelectLabel = (label: Label) => {
    onCheckedClick(label.id);
  };

  const onSaveClick = () => {
    onSave(checkedValues);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавление тегов">
      <div className={style.body}>
        <div className={style.labels}>
          {labels.map((item) => (
            <LabelCard
              key={item.id}
              label={item}
              onSelectLabel={onSelectLabel}
              isChecked={!!checkedValues.find((subItem) => subItem === item.id)}
            />
          ))}
        </div>
        <div className={style.buttons}>
          <Button onClick={onSaveClick} fullwidth>
            Сохранить
          </Button>
          <Button variant="outlined" fullwidth>
            Создать новый
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { AddLabelToDream };
