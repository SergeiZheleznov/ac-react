import React from 'react';

interface IPostPageProps {
  id: string;
}

export const PostPage: React.FC<IPostPageProps> = (props) => {

  return(
    <div>
      {JSON.stringify( props)}
    </div>
  );
}