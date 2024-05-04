import { useState } from 'react';

import { Button, Input, Modal } from '@/components/atoms';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(!isOpen)}>
        Открыть модалку
      </Button>
      <Button variant="text">Кнопка</Button>
      <Button variant="outlined">Кнопка</Button>
      <Input
        label="Первый инпут"
        placeholder="Подсказка один"
        hint="Подсказка hint"
      />
      <Input
        label="Второй инпут"
        placeholder="Подсказка два"
        error="Ошибка"
        hint="Подсказка hint"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Ваши персонажи"
      >
        asdads
      </Modal>
    </>
  );
};

export { MainPage };
