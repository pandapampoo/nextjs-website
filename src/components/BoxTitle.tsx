import * as React from 'react';

export interface IBoxTitleProps {
  children?: React.ReactNode
}

export default function BoxTitle (props: IBoxTitleProps) {
  const { children } = props

  return (
    <div>
      <h1 className="text-xl font-bold leading-tight mb-5 tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {children}
        </h1>
    </div>
  );
}
