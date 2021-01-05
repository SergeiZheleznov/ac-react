import { Grid } from '@material-ui/core';
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
    <Grid container justify="center" spacing={2}>
    {posts?.map((p) => (
        <Grid key={p.id} item>
          <PostCard post={p} />
        </Grid>
      ))}
    </Grid>
  );
}