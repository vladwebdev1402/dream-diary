import { useState } from 'react';

import { Container, Modal, PageTemplate } from '@/components/atoms';
import { LabelForm } from '@/components/organisms';

const LabelsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenClick = () => setIsOpen(true);
  const onCloseClick = () => setIsOpen(false);

  return (
    <Container>
      <PageTemplate
        title="Ваши теги"
        buttonText="Создать тег"
        onClick={onOpenClick}
      >
        <LabelForm formType="create" onCancel={() => {}} />
      </PageTemplate>
      <Modal isOpen={isOpen} title="Создание тега" onClose={onCloseClick}>
        s
      </Modal>
    </Container>
  );
};

export { LabelsPage };
