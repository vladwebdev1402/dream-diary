import { useNavigate } from 'react-router-dom';

import { Container, PageTemplate } from '@/components/atoms';
import { CharacterForm, CharacterFormData } from '@/components/molecules';
import { ROUTER_PATHS } from '@/constants';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { LocalStorageService } from '@/api';

const CharacterCreatePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(
    StoreSelectors.characterList.selectIsLoading,
  );

  const onSuccessSubmit = async (data: CharacterFormData, imageFile?: File) => {
    await dispatch(
      StoreActions.characterList.createCharacter({
        character: {
          userUid: LocalStorageService.getUID(),
          ...data,
        },
        imageFile,
      }),
    );
    navigate(-1);
  };

  const onCancelClick = () => {
    navigate(ROUTER_PATHS.characters);
  };

  return (
    <Container>
      <PageTemplate title="Создание персонажа">
        <CharacterForm
          onSuccessSubmit={onSuccessSubmit}
          isLoading={isLoading}
          formType="create"
          onCancel={onCancelClick}
        />
      </PageTemplate>
    </Container>
  );
};

export { CharacterCreatePage };
