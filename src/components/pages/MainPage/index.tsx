import { Container, DreamList, PageTemplate } from '@/components';

const MainPage = () => {
  return (
    <Container>
      <PageTemplate title="Ваши сны" buttonText="Создать сон">
        <DreamList />
      </PageTemplate>
    </Container>
  );
};

export { MainPage };
