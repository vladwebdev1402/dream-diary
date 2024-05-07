import { useState } from 'react';

import { Container, Modal, PageTemplate } from '@/components/atoms';
import { Label } from '@/components/molecules';

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
        <Label theme="red">Паралич</Label>
        <Label theme="blue">Паралич</Label>
        <Label theme="gold">Паралич</Label>
        <Label theme="gray">Паралич</Label>
        <Label theme="green">Паралич</Label>
      </PageTemplate>
      <Modal isOpen={isOpen} title="Создание тега" onClose={onCloseClick}>
        s
      </Modal>
    </Container>
  );
};

export { LabelsPage };
