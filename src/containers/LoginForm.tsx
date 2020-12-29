import React from 'react';
import { AppContext } from '../context/AppContext';

interface ILoginFormProps {

}

export const LoginForm: React.FC<ILoginFormProps> = (props) => {

  const { authService } = React.useContext(AppContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authService) { return; } 

    const el = event.target as HTMLFormElement;
    const email = (el.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (el.elements.namedItem('password') as HTMLInputElement)?.value;

    const user = authService.login(email, password);
    console.log(user);
  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text"/>
        <input name="password" type="password"/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}