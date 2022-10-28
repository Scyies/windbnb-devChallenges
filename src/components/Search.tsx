import stays from '../../stays.json';
import { v4 } from 'uuid';
import { Dispatch, useState } from 'react';
import clsx from 'clsx';
import { FilterContextProps, useFilter } from '../context/filtersContext';

interface Props {
  openSearch: boolean;
  setOpenSearch: Dispatch<React.SetStateAction<boolean>>;
}

export function Search({ openSearch, setOpenSearch }: Props) {
  const [locationFocus, setLocationFocus] = useState(true);
  const [guestsFocus, setGuestsFocus] = useState(false);

  const [adultCounter, setAdultCounter] = useState(0);
  const [childrenCounter, setChildrenCounter] = useState(0);

  const arrCities = stays.map((stay) => `${stay.city}, ${stay.country}`);

  const cities = arrCities.filter(
    (item, index) => arrCities.indexOf(item) === index
  );

  function closeSearch() {
    setOpenSearch(!openSearch);
  }

  const { locationFilter, setLocationFilter, guestsFilter, setGuestsFilter } =
    useFilter() as FilterContextProps;

  function handleFilterFocus(focus: 'location' | 'guests') {
    if (focus === 'location') setLocationFocus(true), setGuestsFocus(false);
    if (focus === 'guests') setGuestsFocus(true), setLocationFocus(false);
  }

  function setCount(amount: number, state: 'adult' | 'children') {
    if (state === 'adult') {
      if (amount < 0 && adultCounter === 0) return;
      setAdultCounter((currentAmount) => {
        return currentAmount + amount;
      });
    }
    if (state === 'children') {
      if (amount < 0 && childrenCounter === 0) return;
      setChildrenCounter((currentAmount) => {
        return currentAmount + amount;
      });
    }
  }

  return (
    <div
      className={clsx('absolute top-0 w-full min-h-screen h-full z-10', {
        'bg-gray-700/50 translate-y-0': openSearch === true,
        '-translate-y-full': openSearch === false,
      })}
    >
      <div
        className={clsx(
          'absolute top-0 w-full min-h-screen md:min-h-[50vh] z-10 bg-white-100 flex flex-col p-6 font-mulish transition-transform pb-14 md:pb-6',
          {
            'translate-y-0': openSearch === true,
            '-translate-y-full': openSearch === false,
          }
        )}
      >
        <div className='flex justify-between '>
          <h2 className='font-bold'>Edit your search</h2>
          <span
            className='material-symbols-outlined cursor-pointer'
            onClick={closeSearch}
          >
            close
          </span>
        </div>
        <div className='flex flex-col my-4'>
          <div className='flex flex-col md:grid md:grid-cols-3 rounded-2xl shadow-search'>
            <div
              onClick={() => handleFilterFocus('location')}
              className='flex flex-col gap-1 border-b border-white-200 md:border-r px-6 py-3 focus-within:ring-1 ring-gray-400 rounded-lg'
            >
              <label
                htmlFor='country'
                className='text-gray-700 font-bold text-sm'
              >
                LOCATION
              </label>
              <input
                type='text'
                id='country'
                placeholder='Helsinki, Finland'
                className='placeholder:text-gray-200 text-sm outline-none'
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <div
              onClick={() => handleFilterFocus('guests')}
              className='flex flex-col gap-1 px-6 py-3 focus-within:ring-1 ring-gray-400 rounded-lg'
            >
              <label
                htmlFor='guests'
                className='text-gray-700 font-bold text-sm'
              >
                GUESTS
              </label>
              <input
                type='number'
                id='guests'
                placeholder='Add guests'
                className='placeholder:text-gray-200 text-sm outline-none'
                value={guestsFilter! || '' + 'guests'}
                onChange={(e) => setGuestsFilter(Number(e.target.value))}
              />
            </div>
            <div className='absolute bottom-1 left-[50%] -translate-x-1/2 md:translate-x-0 md:static flex items-center md:border-l border-white-200'>
              <button
                type='button'
                onClick={closeSearch}
                className='flex gap-2 px-4 py-3 md:self-center bg-red-500 rounded-2xl text-white-200 max-w-fit items-center font-bold mx-auto'
              >
                <span className='material-symbols-outlined'>search</span>Search
              </button>
            </div>
          </div>
        </div>
        {locationFocus && guestsFocus === false ? (
          <div className='flex flex-col md:ml-12'>
            {cities.map((city) => (
              <div
                key={v4()}
                onClick={() => setLocationFilter(city)}
                className='flex gap-2 my-5 cursor-pointer'
              >
                <span className='material-symbols-outlined text-gray-700'>
                  location_on
                </span>
                <p className='text-gray-500'>{city}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className='font-mulish flex flex-col gap-10 my-10 md:mr-[30%] md:self-end'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col'>
                <p className='font-bold'>Adults</p>
                <p className='text-sm text-gray-200'>Ages 13 or above</p>
              </div>
              <div className='flex gap-3'>
                <button
                  className='ring-1 ring-gray-400 px-2 rounded'
                  onClick={() => setCount(-1, 'adult')}
                >
                  -
                </button>
                <p className='font-bold'>{adultCounter}</p>
                <button
                  className='ring-1 ring-gray-400 px-2 rounded'
                  onClick={() => setCount(1, 'adult')}
                >
                  +
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col'>
                <p className='font-bold'>Children</p>
                <p className='text-sm text-gray-200'>Ages 2-12</p>
              </div>
              <div className='flex gap-3'>
                <button
                  className='ring-1 ring-gray-400 px-2 rounded'
                  onClick={() => setCount(-1, 'children')}
                >
                  -
                </button>
                <p className='font-bold'>{childrenCounter}</p>
                <button
                  className='ring-1 ring-gray-400 px-2 rounded'
                  onClick={() => setCount(1, 'children')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
