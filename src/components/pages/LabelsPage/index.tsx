import { useState } from 'react';

import { Container, Modal, PageTemplate } from '@/components/atoms';
import { LabelsList } from '@/components/organisms';
import { LabelForm } from '@/components/molecules';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { LabelFormData } from '@/types';
import { LocalStorageService } from '@/api';

const LabelsPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    StoreSelectors.labelsList.selectIsActionLoading,
  );

  const [isOpen, setIsOpen] = useState(false);

  const onOpenClick = () => setIsOpen(true);
  const onCloseClick = () => setIsOpen(false);

  const onSuccessSubmit = async (data: LabelFormData) => {
    await dispatch(
      StoreActions.labelsList.createLabel({
        userUid: LocalStorageService.getUID(),
        ...data,
      }),
    );
    setIsOpen(false);
  };

  return (
    <Container>
      <PageTemplate
        title="Ваши теги"
        buttonText="Создать тег"
        onClick={onOpenClick}
      >
        <LabelsList />
      </PageTemplate>
      <Modal isOpen={isOpen} title="Создание тега" onClose={onCloseClick}>
        <LabelForm
          formType="create"
          onCancel={() => setIsOpen(false)}
          isLoading={isLoading}
          onSuccessSubmit={onSuccessSubmit}
        />
      </Modal>
    </Container>
  );
};

export { LabelsPage };
