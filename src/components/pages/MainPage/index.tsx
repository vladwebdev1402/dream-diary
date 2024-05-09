import { Container, DreamList, PageTemplate } from '@/components';
import { ROUTER_PATHS } from '@/constants';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const onCreateClick = () => {
    navigate(ROUTER_PATHS.dreamCreate);
  };

  return (
    <Container>
      <PageTemplate
        title="Ваши сны"
        buttonText="Создать сон"
        onClick={onCreateClick}
      >
        <DreamList />
      </PageTemplate>
    </Container>
  );
};

export { MainPage };
