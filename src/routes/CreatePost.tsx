import React from 'react';
import { Editor } from '../components/Editor';
import { AppContext } from '../context/AppContext';
import { IContentBlock, IPost, postDefault } from '../interfaces';
interface ICreatePostProps {

}
export const CreatePost: React.FC<ICreatePostProps> = (props) => {

  const {postService} = React.useContext(AppContext);
  const [post, setPost] = React.useState<IPost>(postDefault);

  if (postService === undefined) {
    return(<div>Service is not ready</div>);
  }

  const onSave = (contentBlocks: IContentBlock[]) => {
    (async()=>{
      const createdPost = await postService.createPost({...post, source: JSON.stringify(contentBlocks)});
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
      <input type="text" value={post.title} name="title" onChange={(e)=>{
        const value = e.target.value;
        setPost({...post, title: value});
      }} />
      <Editor initialPost={post} onUpdate={onUpdate} onSave={onSave} />
    </div>
  )
}