import { useNavigate } from 'react-router-dom';

import { Container, PageTemplate } from '@/components/atoms';
import { CharacterList } from '@/components/organisms';
import { ROUTER_PATHS } from '@/constants';

const CaharctersPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <PageTemplate
        title="Ваши персонажи"
        buttonText="Создать персонажа"
        onClick={() => navigate(ROUTER_PATHS.characterCreate)}
      >
        <CharacterList />
      </PageTemplate>
    </Container>
  );
};

export { CaharctersPage };
