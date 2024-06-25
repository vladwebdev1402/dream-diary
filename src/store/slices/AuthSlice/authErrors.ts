const authErrors: Record<string, string> = {
  'auth/email-already-exists': 'Данная электронная почта уже используется',
  'auth/email-already-in-use': 'Данная электронная почта уже используется',
  'auth/popup-closed-by-user': 'Вы прервали авторизацию через Google',
  'auth/invalid-credential': 'Неверно введена почта или пароль',
  'auth/invalid-email': 'Почта была введена неккоретно',
};

export { authErrors };
