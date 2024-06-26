import { useEffect, useState } from 'react';

import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { ErrorMessage, Modal } from '@/components/atoms';
import { LabelCard } from '@/components/molecules';
import { Label, LabelFormData } from '@/types';
import { LocalStorageService } from '@/api';

import style from './style.module.scss';
import { LabelListSkeleton } from './LabelListSkeleton';
import { LabelForm } from '../../molecules/LabelForm';

const LabelsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState<null | Label>(null);
  const dispatch = useAppDispatch();
  const isActionLoading = useAppSelector(
    StoreSelectors.labelsList.selectIsActionLoading,
  );
  const { data, isLoading, error } = useAppSelector(
    StoreSelectors.labelsList.selectAll,
  );

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => setCurrentLabel(null), 350);
  };
  const onOpen = () => setIsOpen(true);

  const onSelectLabel = (label: Label) => {
    setCurrentLabel(label);
    onOpen();
  };

  const onSuccessSubmit = (label: LabelFormData) => {
    dispatch(
      StoreActions.labelsList.editLabel({
        data: label,
        id: currentLabel!.id,
        userUid: LocalStorageService.getUID(),
      }),
    );
    onClose();
  };

  useEffect(() => {
    dispatch(
      StoreActions.labelsList.getAllLabels(LocalStorageService.getUID()),
    );
  }, [LocalStorageService.getUID()]);

  if (isLoading) return <LabelListSkeleton />;

  if (error)
    return <ErrorMessage title="Произошла ошибка" description={error} />;

  if (!error && !isLoading && data && data.length === 0)
    return (
      <ErrorMessage
        title="Список тегов пуст"
        description="Создайте новые теги"
      />
    );

  if (data)
    return (
      <div className={style.list}>
        {data.map((item) => (
          <LabelCard
            key={item.id}
            label={item}
            onSelectLabel={onSelectLabel}
            isWithDelete
          />
        ))}
        <Modal title="Редактирование тега" isOpen={isOpen} onClose={onClose}>
          {currentLabel && (
            <LabelForm
              formType="edit"
              defaultValue={{
                name: currentLabel.name,
                theme: currentLabel.theme,
              }}
              onCancel={onClose}
              isLoading={isActionLoading}
              onSuccessSubmit={onSuccessSubmit}
            />
          )}
        </Modal>
      </div>
    );
};

export { LabelsList };
