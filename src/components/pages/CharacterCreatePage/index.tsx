import { Container, PageTemplate } from '@/components/atoms';
import { CharacterForm, CharacterFormData } from '@/components/organisms';
import { myUID } from '@/constants';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';

const CharacterCreatePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    StoreSelectors.characterList.selectIsLoading,
  );
  const onSuccessSubmit = (data: CharacterFormData) => {
    dispatch(
      StoreActions.characterList.createCharacter({ userUid: myUID, ...data }),
    );
  };

  return (
    <Container>
      <PageTemplate title="Создание персонажа">
        <CharacterForm
          onSuccessSubmit={onSuccessSubmit}
          isLoading={isLoading}
        />
      </PageTemplate>
    </Container>
  );
};

export { CharacterCreatePage };
