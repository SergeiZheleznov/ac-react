import React from 'react';
import { IContentBlock, IContentBlockText, IPost } from '../../interfaces';
import { BlockText } from './BlockText';

interface IEditorProps {
  initialPost: IPost;
  onSave: (contentBlocks: IContentBlock[]) => void;
  onUpdate: (post: IPost) => void;
}

export const Editor: React.FC<IEditorProps> = (props) => {

  const {initialPost: post, onSave, onUpdate} = props;

  let initContentBlocks = [];
  
  try {
    initContentBlocks = JSON.parse(post.source);
  } catch (error) {
    
  }
  if (initContentBlocks?.length < 1) {
    initContentBlocks = [];
  }

  const [contentBlocks, setContentBlocks] = React.useState<IContentBlock[]>(initContentBlocks);

  React.useEffect(()=>{
    // onUpdate({...post, source: JSON.stringify(contentBlocks)});
  }, [contentBlocks, onUpdate, post]);

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

      <button className={'block py-2'} onClick={addBlock}>+</button>
      <button onClick={onSaveHandler}>Save</button>
    </div>
  );
}