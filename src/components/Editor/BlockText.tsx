import { TextareaAutosize } from '@material-ui/core';
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
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = event.target;
    updateBlock({...contentBlock, source: el.value});
  }

  return(
    <div>
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={3}
        placeholder="Minimum 3 rows"
        value={contentBlock.source}
        onChange={onChange}
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
