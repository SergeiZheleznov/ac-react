import React from 'react';

interface IBlockTextProps {

}

export const BlockText: React.FC<IBlockTextProps> = (props) => {
  return(
    <div className={'py-3 border-gray-100'}>
      <textarea className={'w-full resize-y border'}>
        text
      </textarea>
    </div>
  );
}