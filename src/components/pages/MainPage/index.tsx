import { Button, Input } from '@/components/atoms';

const MainPage = () => {
  return (
    <>
      <Button variant="contained">Кнопка</Button>
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
    </>
  );
};

export { MainPage };
