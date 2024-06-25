import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Container, Input, Typography } from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { SignUpData } from '@/types';
import { ROUTER_PATHS } from '@/constants';
import GoogleSVG from '@/assets/decoration/google.svg?react';

import style from './style.module.scss';
import { useEffect } from 'react';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formState, handleSubmit, register } = useForm<SignUpData>();
  const isActionLoading = useAppSelector(
    StoreSelectors.auth.selectActionIsLoading,
  );
  const error = useAppSelector(StoreSelectors.auth.selectError);
  const isAuth = useAppSelector(StoreSelectors.auth.selectIsAuth);

  const onSignInSubmitForm: SubmitHandler<SignUpData> = async (data) => {
    await dispatch(StoreActions.auth.signInByEmail(data));
  };

  const onSignInButtonClick = async () => {
    await dispatch(StoreActions.auth.signUpByGoogle());
  };

  useEffect(() => {
    if (isAuth) navigate(ROUTER_PATHS.main);
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(StoreActions.auth.clear());
  }, []);

  return (
    <Container variant="small">
      <div className={style.title}>
        <Typography variant="h2">Авторизация</Typography>
      </div>
      <form className={style.form} onSubmit={handleSubmit(onSignInSubmitForm)}>
        <Input
          label="Почта"
          {...register('email', {
            required: {
              value: true,
              message: 'Поле необходимо обязательно заполнить',
            },
          })}
          error={formState.errors.email?.message}
          type="email"
        />
        <Input
          label="Пароль"
          {...register('password', {
            required: {
              value: true,
              message: 'Поле необходимо обязательно заполнить',
            },
            minLength: {
              value: 8,
              message: 'Минимальная длина пароля 8 символов',
            },
          })}
          error={formState.errors.password?.message}
          type="password"
        />
        <Typography>
          Если у вас нет аккаунта, то можно{' '}
          <Link to={ROUTER_PATHS.signUp}>
            <span className={style.sign}>зарегистрироваться</span>
          </Link>
        </Typography>

        <Button fullwidth type="submit" isLoading={isActionLoading}>
          Авторизоваться
        </Button>
        <Button
          Icon={<GoogleSVG />}
          fullwidth
          variant="outlined"
          type="button"
          isLoading={isActionLoading}
          onClick={onSignInButtonClick}
        >
          Войти при помощи Google
        </Button>
        <div className={style.error}>
          <Typography>{error}</Typography>
        </div>
      </form>
    </Container>
  );
};

export { SignInPage };
