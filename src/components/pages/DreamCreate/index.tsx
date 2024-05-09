import { useNavigate } from 'react-router-dom';

import { Container, PageTemplate } from '@/components/atoms';
import { DreamForm } from '@/components/organisms';
import { ROUTER_PATHS, myUID } from '@/constants';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { DreamFormData } from '@/types';
import { Timestamp } from 'firebase/firestore';

const DreamCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isActionloading = useAppSelector(
    StoreSelectors.dreamList.selectIsActionLoading,
  );

  const onCancelClick = () => {
    navigate(ROUTER_PATHS.main);
  };

  const onSuccessSubmit = async (dream: DreamFormData) => {
    await dispatch(
      StoreActions.dreamList.createDream({
        ...dream,
        userUid: myUID,
        date: Timestamp.fromDate(new Date()),
      }),
    );

    onCancelClick();
  };

  return (
    <Container>
      <PageTemplate title="Создание сна">
        <DreamForm
          formType="create"
          onCancel={onCancelClick}
          isLoading={isActionloading}
          onSuccessSubmit={onSuccessSubmit}
        />
      </PageTemplate>
    </Container>
  );
};

export { DreamCreate };
