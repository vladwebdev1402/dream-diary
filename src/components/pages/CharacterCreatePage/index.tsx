import { Container, PageTemplate } from '@/components/atoms';
import { CharacterForm } from '@/components/organisms';

const CharacterCreatePage = () => {
  return (
    <Container>
      <PageTemplate title="Создание персонажа">
        <CharacterForm />
      </PageTemplate>
    </Container>
  );
};

export { CharacterCreatePage };
