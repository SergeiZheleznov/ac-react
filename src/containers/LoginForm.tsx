import React from 'react';
import { AppContext } from '../context/AppContext';

interface ILoginFormProps {

}

export const LoginForm: React.FC<ILoginFormProps> = (props) => {

  const { authService } = React.useContext(AppContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('onSubmit', event);
    event.preventDefault();
    const el = event.target;
    console.log(el);

    if (authService){
      const user = authService.authenticate('login', 'password');
      console.log(user);
    }
  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input id="email" name="email" type="text"/>
        <input id="password" name="password" type="password"/>
        <button type="submit" >Send</button>
      </form>
    </div>
  );
}