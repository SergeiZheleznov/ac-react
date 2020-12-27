import React from 'react';
import { IPost } from '../interfaces';
interface IPostCardProps {
  post: IPost;
}
export const PostCard: React.FC<IPostCardProps> = (props) => {
  const {post} = props;
  return(
    <div>
      {post.title}
    </div>
  );
}