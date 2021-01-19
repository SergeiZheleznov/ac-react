import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { PostCard } from '../components';
import { AppContext } from '../context/AppContext';
interface IPostsListProps {

}
export const PostsList: React.FC = observer((props: IPostsListProps) => {
  
  const { rootStore } = React.useContext(AppContext);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(()=>{
    (async ()=>{
      setIsLoading(true);
      await rootStore.postStore.getAll();
      setIsLoading(false);
    })();
  }, [rootStore.postStore]);

  if (isLoading) {
    return(
      <div>Loading...</div>
    );
  }

  return(
    <Grid container justify="center" spacing={2}>
    {rootStore.postStore.posts.map((p) => (
        <Grid key={p.id} item>
          <PostCard post={p} />
        </Grid>
      ))}
    </Grid>
  );
});