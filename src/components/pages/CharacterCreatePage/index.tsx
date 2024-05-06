import { Container, PageTemplate } from '@/components/atoms';
import { CharacterForm, CharacterFormData } from '@/components/organisms';
import { StoreActions, useAppDispatch } from '@/store';

const CharacterCreatePage = () => {
  const dispatch = useAppDispatch();
  const onSuccessSubmit = (data: CharacterFormData) => {
    dispatch(StoreActions.characterList.addNewCharacter(data));
  };

  return (
    <Container>
      <PageTemplate title="Создание персонажа">
        <CharacterForm onSuccessSubmit={onSuccessSubmit} />
      </PageTemplate>
    </Container>
  );
};

export { CharacterCreatePage };
