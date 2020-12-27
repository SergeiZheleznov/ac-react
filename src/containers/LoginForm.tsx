import React from 'react';

interface ILoginFormProps {

}

export const LoginForm: React.FC<ILoginFormProps> = (props) => {

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('onSubmit', event);
    event.preventDefault();
    const el = event.target;
    console.log(el);
  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text"/>
        <input name="password" type="password"/>
        <button type="submit" >Send</button>
      </form>
    </div>
  );
}