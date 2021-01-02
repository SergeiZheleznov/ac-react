import React from 'react';
import { IContentBlock, IContentBlockText, IPost, WorkingMode } from '../../interfaces';
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
  const [activeBlockId, setActiveBlockId] = React.useState<number>(-1);

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

  const setMode = (idx: number, mode: WorkingMode) => {
    if (mode === 'edit') {
      setActiveBlockId(idx);
    }
    if (idx === activeBlockId) {
      setActiveBlockId(-1);
    }
  }

  return(
    <div className={'block'}>
      <h2>Blocks</h2>
      {contentBlocks.map((b, idx)=>{
        switch (b.type) {
          case 'text':
            return <BlockText
              mode={activeBlockId === idx ? 'edit' : 'view'}
              idx={idx}
              setMode={setMode}
              contentBlock={b as IContentBlockText}
              key={`block_${idx}`}
              updateBlock={(block: IContentBlockText)=>{
                setContentBlocks(contentBlocks.map(el => (el === b ? block : el)));
              }}
            />;
        }
        return(<div>Unknown</div>);
      })}
      <button onClick={addBlock} type="button" className="inline-flex w-full items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">+</button>
      <button onClick={onSaveHandler}>Save</button>
    </div>
  );
}