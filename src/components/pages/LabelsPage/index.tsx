import { useState } from 'react';

import { Container, Modal, PageTemplate } from '@/components/atoms';
import { LabelForm, LabelsList } from '@/components/organisms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { LabelFormData } from '@/types';
import { myUID } from '@/constants';

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
      StoreActions.labelsList.createLabel({ userUid: myUID, ...data }),
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
