import React from 'react';
import { IContentBlockText } from '../../interfaces';

interface IBlockTextProps {
  contentBlock: IContentBlockText;
  onValueUpdated: (value: string) => void;
}

export const BlockText: React.FC<IBlockTextProps> = (props) => {

  const {onValueUpdated, contentBlock} = props;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    onValueUpdated(value);
  }

  return(
    <div className={'py-3 border-gray-100'}>
      <textarea onChange={onChange} className={'w-full resize-y border'} value={contentBlock.source} />
    </div>
  );
}