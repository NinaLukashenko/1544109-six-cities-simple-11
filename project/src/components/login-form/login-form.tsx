import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { Nullable } from '../../types/utils';
import { isNotEmpty, isPasswordValid } from '../../utils/utils';

const LoginForm = () => {
  const loginRef = useRef<Nullable<HTMLInputElement>>(null);
  const passwordRef = useRef<Nullable<HTMLInputElement>>(null);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (isNotEmpty(loginRef.current.value) && isPasswordValid(passwordRef.current.value)) {
        const authData = {
          login: loginRef.current.value,
          password: passwordRef.current.value,
        };

        dispatch(loginAction(authData));
      }
    }
  };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="email">E-mail</label>
        <input
          ref={loginRef}
          className="login__input form__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          data-testid="email"
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          className="login__input form__input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          data-testid="password"
        />
      </div>
      <button className="login__submit form__submit button" type="submit" data-testid="button">Sign in</button>
    </form>
  );
};

export default LoginForm;
