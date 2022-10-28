import { Router } from './routes';
import FilterContextProvider from './context/filtersContext';

function App() {
  return (
    <FilterContextProvider>
      <Router />
    </FilterContextProvider>
  );
}

export default App;
