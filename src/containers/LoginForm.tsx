import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppContext } from '../context/AppContext';

interface ILoginFormProps {

}

export const LoginForm: React.FC<ILoginFormProps> = observer((props) => {

  const { rootStore } = React.useContext(AppContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const el = event.target as HTMLFormElement;
    const email = (el.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (el.elements.namedItem('password') as HTMLInputElement)?.value;

    rootStore.authStore.login(email, password);
  }

  return(
    <div>
      {!rootStore.authStore.currentUser ? <form onSubmit={onSubmit}>
        <input name="email" type="text"/>
        <input name="password" type="password"/>
        <button type="submit">Send</button>
      </form> : `Hi, ${rootStore.authStore.currentUser.username}`}
    </div>
  );
});