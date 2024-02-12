import * as React from 'react';

export interface IScrollBarProps {
  name?: string;
}

export const ScrollBar = (props: IScrollBarProps) => {
  const [scrollBarPosition, setScrollBarPosition] = React.useState(0);
  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setScrollBarPosition(scrollTop);
  }, []);

  const handleWindowScroll = React.useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollHeight);
  }, []);

  window.addEventListener('scroll', handleWindowScroll);

  return (
    <>
      <div
        style={{ width: '20px', height: '200px', display: 'block', overflow: 'scroll' }}
        onScroll={handleScroll}
        key='pcf-scrollbar'
      >
        <div style={{ display: 'block', height: '500px', width: '1px' }}></div>
      </div>
      {scrollBarPosition}
    </>
  );
};
