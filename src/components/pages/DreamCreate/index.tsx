import { useNavigate } from 'react-router-dom';

import { Container, PageTemplate } from '@/components/atoms';
import { DreamForm } from '@/components/organisms';
import { ROUTER_PATHS } from '@/constants';

const DreamCreate = () => {
  const navigate = useNavigate();

  const onCancelClick = () => {
    navigate(ROUTER_PATHS.main);
  };

  return (
    <Container>
      <PageTemplate title="Создание сна">
        <DreamForm formType="create" onCancel={onCancelClick} />
      </PageTemplate>
    </Container>
  );
};

export { DreamCreate };
