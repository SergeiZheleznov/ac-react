import React from 'react';
import { Editor } from '../components/Editor';
import { AppContext } from '../context/AppContext';
import { IPost, postDefault } from '../interfaces';
interface ICreatePostProps {

}
export const CreatePost: React.FC<ICreatePostProps> = (props) => {

  const {postService} = React.useContext(AppContext);
  const [post, setPost] = React.useState<IPost>(postDefault);

  if (postService === undefined) {
    return(<div>Service is not ready</div>);
  }

  const onSave = () => {
    (async()=>{
      const createdPost = await postService.createPost(post);
      if (!createdPost) {
        return;
      }
      console.log('createdPost', createdPost);
    })();
  }

  const onUpdate = (post: IPost) => {
    setPost(post);
  }

  return (
    <div>
      <h1>Create Post</h1>
      <Editor post={post} onUpdate={onUpdate} onSave={onSave} />
    </div>
  )
}