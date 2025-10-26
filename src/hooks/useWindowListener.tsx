import { useEffect } from 'react';

function useWindowListener(eventType: string, listener: EventListener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, []);
}

export default useWindowListener;
