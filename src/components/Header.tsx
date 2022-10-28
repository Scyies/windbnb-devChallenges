import clsx from 'clsx';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FilterContextProps, useFilter } from '../context/filtersContext';
import { SearchPage } from '../pages/SearchPage';
import { Search } from './Search';

export function Header() {
  const [openSearch, setOpenSearch] = useState(false);

  const { guestsFilter, locationFilter } = useFilter() as FilterContextProps;

  function closeSearch() {
    setOpenSearch(!openSearch);
  }
  return (
    <>
      <Search openSearch={openSearch} setOpenSearch={setOpenSearch} />
      <header className='flex flex-col md:flex-row md:justify-between md:items-center md:mx-24 px-3 py-4'>
        <div className='flex items-center gap-2'>
          <img src='/triangleLogo.svg' alt='' className='h-5 w-5' />
          <p className='font-poppins font-bold text-red-500'>windbnb</p>
        </div>
        <div
          onClick={closeSearch}
          className='flex items-center max-w-fit rounded-2xl shadow-search mt-10 md:mt-0 mx-auto md:mx-0 font-mulish cursor-pointer hover:ring-1 hover:ring-gray-400 transition-all'
        >
          <div className='border-r border-white-200 px-4 py-4'>
            <p
              className={clsx({
                'text-gray-200': locationFilter.length <= 0,
                'text-gray-700': locationFilter.length > 0,
              })}
            >
              {locationFilter.length > 0 ? locationFilter : 'City, Country'}
            </p>
          </div>
          <div className='border-r border-white-200 px-4 py-4'>
            <p
              className={clsx({
                'text-gray-700': guestsFilter != null,
                'text-gray-200': guestsFilter === null,
              })}
            >
              {guestsFilter != null ? guestsFilter : 'Add guests'}
            </p>
          </div>
          <div className='material-symbols-outlined text-red-500/90 px-4 py-4'>
            search
          </div>
        </div>
      </header>
      {guestsFilter != null || locationFilter.length > 0 ? (
        <SearchPage />
      ) : (
        <Outlet />
      )}
      <footer className='flex py-4 mx-auto max-w-fit font-montserrat text-gray-400'>
        created by <strong className='px-1'> Sérgio Valério </strong> -
        devChallenges.io
      </footer>
    </>
  );
}
