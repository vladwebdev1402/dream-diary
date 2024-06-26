import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

import { Container, PageTemplate } from '@/components/atoms';
import { DreamForm } from '@/components/organisms';
import { ROUTER_PATHS } from '@/constants';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { DreamFormData } from '@/types';
import { LocalStorageService } from '@/api';

const DreamCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isActionloading = useAppSelector(
    StoreSelectors.dreamList.selectIsActionLoading,
  );

  const onCancelClick = () => {
    navigate(ROUTER_PATHS.main);
  };

  const onSuccessSubmit = async (dream: DreamFormData, imageFile?: File) => {
    await dispatch(
      StoreActions.dreamList.createDream({
        dream: {
          ...dream,
          userUid: LocalStorageService.getUID(),
          date: Timestamp.fromDate(new Date()),
        },
        imageFile,
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
