import * as React from 'react';

export interface IScrollBarProps {
  stateChanged: () => void;

  scrollbar: {
    height?: number;
    width?: number;
  };
  child: IChildContainer;
  scrollbarPostion: (position: number) => void;
}

export interface IChildContainer {
  height: number;
  width: number;
}

export const ScrollBar = (props: IScrollBarProps) => {
  const { scrollbar, child, scrollbarPostion, stateChanged } = props;
  const [scrollBarPosition, setScrollBarPosition] = React.useState(0);
  const [isScrollingScrollbar, setIsScrollingScrollbar] = React.useState(false);
  const scrollbarRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setScrollBarPosition(scrollTop);
    setIsScrollingScrollbar(true);
    let wheelEventEndTimeout: number = 0;
    clearTimeout(wheelEventEndTimeout);
    wheelEventEndTimeout = window.setTimeout(() => {
      setIsScrollingScrollbar(false);
    }, 150);
  }, []);

  window.addEventListener('wheel', (e) => {
    let scrollSize = 1;

    if (!isScrollingScrollbar) {
      if (e.deltaY < 0) scrollSize = -1;

      scrollbarRef.current?.scrollTo({ top: scrollbarRef.current.scrollTop + scrollSize });
    }
  });

  // Notify change to power apps
  React.useEffect(() => {
    stateChanged();
    scrollbarPostion(scrollBarPosition);
  }, [scrollBarPosition]);

  return (
    <>
      <div
        style={{ width: scrollbar.width + 'px', height: scrollbar.height + 'px', display: 'block', overflow: 'scroll' }}
        onScroll={handleScroll}
        key='pcf-scrollbar'
        ref={scrollbarRef}
      >
        <div style={{ display: 'block', height: child.height + 'px', width: child.width + 'px' }}></div>
      </div>
      {scrollBarPosition}
    </>
  );
};
