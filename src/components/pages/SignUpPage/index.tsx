import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Button, Container, Input, Typography } from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { ROUTER_PATHS } from '@/constants';
import GoogleSVG from '@/assets/decoration/google.svg?react';

import style from './style.module.scss';

type SignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const actionIsLoading = useAppSelector(
    StoreSelectors.auth.selectActionIsLoading,
  );
  const error = useAppSelector(StoreSelectors.auth.selectError);
  const isAuth = useAppSelector(StoreSelectors.auth.selectIsAuth);
  const { register, handleSubmit, watch, formState } = useForm<SignUpForm>();

  const onSignUpSubmit: SubmitHandler<SignUpForm> = (data) => {
    dispatch(StoreActions.auth.signUpByEmail(data));
  };

  const onSignUpButtonClick = () => {
    dispatch(StoreActions.auth.signUpByGoogle());
  };

  useEffect(() => {
    if (isAuth) navigate(ROUTER_PATHS.main);
  }, [isAuth, navigate]);

  return (
    <Container variant="small">
      <div className={style.title}>
        <Typography variant="h2">Регистрация</Typography>
      </div>
      <form className={style.form} onSubmit={handleSubmit(onSignUpSubmit)}>
        <Input
          label="Почта"
          {...register('email', {
            required: {
              value: true,
              message: 'Поле необходимо обязательно заполнить',
            },
          })}
          type="email"
          error={formState.errors.email?.message}
          required
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
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
              message:
                'Пароль должен содержать как минимум одну цифру, одну строчную букву, одну заглавную букву, один из специальных символов: !@#$%^&*.',
            },
          })}
          type="password"
          error={formState.errors.password?.message}
          required
        />
        <Input
          label="Повторите пароль"
          {...register('repeatPassword', {
            required: {
              value: true,
              message: 'Поле необходимо обязательно заполнить',
            },
            minLength: {
              value: 8,
              message: 'Минимальная длина пароля 8 символов',
            },
            validate: (value) => {
              if (value !== watch('password')) return 'Пароли не совпадает';
            },
          })}
          type="password"
          error={formState.errors.repeatPassword?.message}
          required
        />
        <Typography>
          Если вы зарегистрированы, то можно{' '}
          <Link to={ROUTER_PATHS.signIn}>
            <span className={style.auth}>авторизоваться</span>
          </Link>
        </Typography>

        <Button type="submit" fullwidth isLoading={actionIsLoading}>
          Зарегистрироваться
        </Button>
        <Button
          type="button"
          variant="outlined"
          fullwidth
          isLoading={actionIsLoading}
          Icon={<GoogleSVG />}
          onClick={onSignUpButtonClick}
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

export { SignUpPage };
