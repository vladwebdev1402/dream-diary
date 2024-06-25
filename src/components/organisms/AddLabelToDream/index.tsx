import { FC, useState } from 'react';

import { Button, Modal } from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { useCheckedValues } from '@/hooks';

import style from './style.module.scss';
import { LabelCard, LabelForm } from '@/components/molecules';
import { Label, LabelFormData } from '@/types';
import { LocalStorageService } from '@/api';

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
  const dispatch = useAppDispatch();
  const [windowType, setWindowType] = useState<'add' | 'create'>('add');
  const { checkedValues, onCheckedClick } = useCheckedValues(currentLabels);

  const labels = useAppSelector(StoreSelectors.labelsList.selectData);
  const isLoading = useAppSelector(
    StoreSelectors.labelsList.selectIsActionLoading,
  );

  const onSuccessSubmit = async (data: LabelFormData) => {
    await dispatch(
      StoreActions.labelsList.createLabel({
        userUid: LocalStorageService.getUID(),
        ...data,
      }),
    );
    setWindowType('add');
  };

  const onSelectLabel = (label: Label) => {
    onCheckedClick(label.id);
  };

  const onSaveClick = () => {
    onSave(checkedValues);
    onClose();
  };
  if (labels)
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={windowType === 'add' ? 'Добавление тегов' : 'Создание тега'}
      >
        <div className={style.body}>
          {windowType === 'add' && (
            <>
              <div className={style.labels}>
                {labels.map((item) => (
                  <LabelCard
                    key={item.id}
                    label={item}
                    onSelectLabel={onSelectLabel}
                    isChecked={
                      !!checkedValues.find((subItem) => subItem === item.id)
                    }
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
                  Создать новый
                </Button>
              </div>
            </>
          )}
          {windowType === 'create' && (
            <LabelForm
              formType="create"
              onCancel={() => setWindowType('add')}
              onSuccessSubmit={onSuccessSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </Modal>
    );
};

export { AddLabelToDream };
