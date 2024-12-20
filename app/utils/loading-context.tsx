import { useLocation, useNavigation } from '@remix-run/react';
import { createContext, useContext, useState, useEffect } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  isMounted: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('LoadingProvider mounted');
    setIsMounted(true);
    
    const timer = setTimeout(() => {
      console.log('Initial loading completed');
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    console.log('Navigation state:', navigation.state, 'Location:', navigation.location?.pathname);

    if (navigation.state === "loading" && navigation.location?.pathname === '/') {
      console.log('Setting loading to true');
      setIsLoading(true);
    }
  }, [isMounted, navigation.state, navigation.location]);

  useEffect(() => {
    if (isLoading && navigation.state !== "loading") {
      console.log('Loading timer started');
      const timer = setTimeout(() => {
        console.log('Loading timer completed');
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, navigation.state]);

  console.log('LoadingProvider render - isLoading:', isLoading, 'isMounted:', isMounted);

  return (
    <LoadingContext.Provider value={{ isLoading, isMounted }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}