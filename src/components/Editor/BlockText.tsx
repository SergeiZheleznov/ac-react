import MarkdownIt from 'markdown-it';
import React from 'react';
import { IContentBlockText, WorkingMode } from '../../interfaces';


interface IBlockTextProps {
  idx: number;
  contentBlock: IContentBlockText;
  mode: WorkingMode;
  updateBlock: (block: IContentBlockText) => void;
  setMode: (idx: number, mode: WorkingMode) => void;
}
interface IViewModeProps {
  source: string;
  changeMode: (mode: WorkingMode) => void;
};

const ViewMode: React.FC<IViewModeProps> = (props) => {
  const {source, changeMode} = props;
  const md = new MarkdownIt();
  return(
    <div
      className={'py-2 prose hover:bg-gray-50 cursor-pointer'}
      onClick={()=>changeMode('edit')}
      dangerouslySetInnerHTML={{__html: source ? md.render(source) : 'click to edit'}}
      />
  );
}

interface IEditModeProps {
  contentBlock: IContentBlockText;
  updateBlock: (block: IContentBlockText) => void;
  changeMode: (mode: WorkingMode) => void;
}

const EditMode: React.FC<IEditModeProps> = (props) => {

  const {contentBlock, updateBlock, changeMode} = props;

  const [rows, setRows] = React.useState<number>(4);
  const minRows = 4;
  const maxRows = 30;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = event.target;
    updateBlock({...contentBlock, source: el.value});

    const textareaLineHeight = 16;
    const previousRows = el.rows;
    el.rows = minRows;
    const currentRows = ~~(el.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
    	el.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			el.rows = maxRows;
			el.scrollTop = el.scrollHeight;
    }
    
    setRows(currentRows < maxRows ? currentRows : maxRows);
  }

  return(
    <div>
      <textarea
        onChange={onChange}
        style={{lineHeight: '16px'}}
        onBlur={()=>changeMode('view')}
        className={'w-full resize-y border'}
        value={contentBlock.source}
        rows={rows}
      />
    </div>
  );
}

export const BlockText: React.FC<IBlockTextProps> = (props) => {
  const {updateBlock, contentBlock, mode, idx, setMode} = props;

  const changeMode = (mode: WorkingMode) => {
    setMode(idx, mode);
  }
  if (mode === 'view') {
    return <ViewMode source={contentBlock.source} changeMode={changeMode} />;
  }
  return <EditMode contentBlock={contentBlock} updateBlock={updateBlock} changeMode={changeMode} />;
}
