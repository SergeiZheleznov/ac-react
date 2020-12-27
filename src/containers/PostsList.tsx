import React from 'react';
import { PostCard } from '../components';
import { AppContext } from '../context/AppContext';
import { IPost } from '../interfaces';
interface IPostsListProps {

}
export const PostsList: React.FC = (props: IPostsListProps) => {
  
  const { postService } = React.useContext(AppContext);
  const [ posts, setPosts ] = React.useState<IPost[]>([]);

  React.useEffect(()=>{
    (async()=>{
      const response = await postService?.getLastPosts();
      if (response) {
        setPosts(response);
      }
    })();
  }, [postService]);

  if (posts.length < 1) {
    return(
      <div>Loading...</div>
    );
  }

  return(
    <div>
      {posts?.map(p=><PostCard key={p.id} post={p} />)}
    </div>
  );
}