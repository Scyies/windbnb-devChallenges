import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';

export interface FilterContextProps {
  locationFilter: string;
  setLocationFilter: Dispatch<React.SetStateAction<string>>;
  guestsFilter: number | null;
  setGuestsFilter: Dispatch<React.SetStateAction<number | null>>;
}

interface ContextProps {
  children: ReactNode;
}

const FilterContext = createContext<FilterContextProps | null>(null);

export default function filterContext({ children }: ContextProps) {
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [guestsFilter, setGuestsFilter] = useState<number | null>(null);

  if (guestsFilter === 0) setGuestsFilter(null);

  return (
    <FilterContext.Provider
      value={{
        locationFilter,
        setLocationFilter,
        guestsFilter,
        setGuestsFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
