import { Button, Container, Typography } from '@/components/atoms';
import { CharacterList } from '@/components/organisms';

import style from './style.module.scss';

const CaharctersPage = () => {
  return (
    <Container>
      <div className={style.head}>
        <Typography component="h2" variant="h2">
          Ваши персонажи
        </Typography>
        <Button variant="outlined" size="small">
          Создать персонажа
        </Button>
      </div>
      <div className={style.body}>
        <CharacterList />
      </div>
    </Container>
  );
};

export { CaharctersPage };
