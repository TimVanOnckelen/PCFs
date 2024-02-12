import * as React from 'react';

export interface IScrollBarProps {
  stateChanged: () => void;
  scrollbar: {
    height?: number;
    width?: number;
  };
  child: IChildContainer;
  scrollbarPosition: (position: number) => void; // Corrected typo
}

export interface IChildContainer {
  height: number;
  width: number;
}

export const ScrollBar = (props: IScrollBarProps) => {
  const { scrollbar, child, scrollbarPosition, stateChanged } = props;
  const scrollbarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollbarRef.current) {
        const { scrollTop } = scrollbarRef.current;
        scrollbarPosition(scrollTop);
        stateChanged();
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100); // Adjust debounce time as needed

    if (scrollbarRef.current) {
      scrollbarRef.current.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    }

    return () => {
      if (scrollbarRef.current) {
        scrollbarRef.current.removeEventListener('scroll', debouncedHandleScroll);
      }
    };
  }, [scrollbarPosition, stateChanged]);

  return (
    <>
      {scrollbarPosition}
      <div
        style={{ width: scrollbar.width + 'px', height: scrollbar.height + 'px', overflow: 'scroll' }}
        ref={scrollbarRef}
      >
        <div style={{ height: child.height + 'px', width: child.width + 'px' }}></div>
      </div>
    </>
  );
};

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
