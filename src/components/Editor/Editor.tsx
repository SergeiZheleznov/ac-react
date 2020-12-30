import React from 'react';
import { PostHelper } from '../../helpers/PostHelper';
import { IContentBlock, IContentBlockText, IPost } from '../../interfaces';
import { BlockText } from './BlockText';

interface IEditorProps {
  post: IPost;
  onSave: (contentBlocks: IContentBlock[]) => void;
  onUpdate: (post: IPost) => void;
}

export const Editor: React.FC<IEditorProps> = (props) => {

  const {post, onSave} = props;
  const [contentBlocks, setContentBlocks] = React.useState<IContentBlock[]>(PostHelper.getContentBlocks(post));

  const addBlock = () => {

    const textBlock: IContentBlockText = {
      align: 'left',
      type: 'text',
      source: ''
    };
    setContentBlocks([...contentBlocks, textBlock ]);
  };

  const onSaveHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onSave(contentBlocks);
  }

  return(
    <div>
      <h2>Blocks</h2>
      {contentBlocks.map((b, idx)=>{
        switch (b.type) {
          case 'text':
            return <BlockText
              contentBlock={b as IContentBlockText}
              key={`block_${idx}`}
              onValueUpdated={(value)=>{
                setContentBlocks(contentBlocks.map(el => (el === b ? {...b, source: value} : el)));
              }}
            />;
        }
        return(<div>Unknown</div>);
      })}

      <button onClick={addBlock}>+</button>
      <button onClick={onSaveHandler}>Save</button>
    </div>
  );
}