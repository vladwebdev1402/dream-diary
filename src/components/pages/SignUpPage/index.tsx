import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, Input, Typography } from '@/components/atoms';

import style from './style.module.scss';

type SignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUpPage = () => {
  const { register, handleSubmit, watch, formState } = useForm<SignUpForm>();

  const onSignUpSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
  };

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
        />
        <Button type="submit" fullwidth>
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  );
};

export { SignUpPage };
