import { Button, Container, DreamList, Typography } from '@/components';

import style from './style.module.scss';

const MainPage = () => {
  return (
    <Container>
      <div className={style.head}>
        <Typography variant="h2" component="h2">
          Ваши сны
        </Typography>
        <Button variant="outlined" size="small">
          Создать сон
        </Button>
      </div>
      <div className={style.body}>
        <DreamList />
      </div>
    </Container>
  );
};

export { MainPage };
