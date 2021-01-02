import MarkdownIt from 'markdown-it';
import React from 'react';
import { IContentBlockText } from '../../interfaces';

interface IBlockTextProps {
  contentBlock: IContentBlockText;
  onValueUpdated: (value: string) => void;
}

type BlockMode  = 'view' | 'edit';
interface IViewModeProps {
  source: string;
  changeMode: (mode: BlockMode) => void;
};

const ViewMode: React.FC<IViewModeProps> = (props) => {
  const {source, changeMode} = props;
  const md = new MarkdownIt();
  return(
    <div
      className={'border-gray-100 p-2 prose'}
      onClick={()=>changeMode('edit')}
      dangerouslySetInnerHTML={{__html: source ? md.render(source) : 'click to edit'}}
      />
      
  );
}

export const BlockText: React.FC<IBlockTextProps> = (props) => {

  const {onValueUpdated, contentBlock} = props;
  const [mode, setMode] = React.useState<BlockMode>('view');

  const changeMode = (mode: BlockMode) => {
    setMode(mode);
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    onValueUpdated(value);
  }

  if (mode === 'view') {
    return(<ViewMode source={contentBlock.source} changeMode={changeMode} />)
  }

  return(
    <div className={'py-3 border-gray-100'}>
      <textarea onChange={onChange} onBlur={()=>changeMode('view')} className={'w-full resize-y border'} value={contentBlock.source} />
    </div>
  );
}
