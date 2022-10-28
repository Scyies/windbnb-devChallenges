import { useFilter, FilterContextProps } from '../context/filtersContext';
import stays from '../../stays.json';
import { Card } from '../components/Card';
import { v4 } from 'uuid';

export function SearchPage() {
  const { guestsFilter, locationFilter } = useFilter() as FilterContextProps;

  const filterSplit = locationFilter.split(',');

  const cityFilter = filterSplit[0];

  const countryFilter = filterSplit[1];

  const displayedList = stays.filter((element) => {
    if (guestsFilter === null && locationFilter.length <= 0) return true;

    const cityFiltered =
      element.city.includes(cityFilter) ||
      element.country.includes(countryFilter);
    if (guestsFilter != null) {
      const guestsFiltered = element.maxGuests >= guestsFilter;
      return guestsFiltered && cityFiltered;
    }
    return cityFiltered;
  });
  return (
    <main className='flex flex-col mx-3 min-h-[calc(100vh-144px)] md:mx-24'>
      <div className='flex justify-between items-center font-montserrat mx-3'>
        <h1 className=' font-bold text-lg'>Stays in {countryFilter}</h1>
        <p className='text-gray-500'>{displayedList.length} stays</p>
      </div>
      <section className='grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {displayedList.map((stay) => (
          <Card
            key={v4()}
            photo={stay.photo}
            city={stay.city}
            beds={stay?.beds!}
            superHost={stay.superHost}
            country={stay.country}
            rating={stay.rating}
            type={stay.type}
            title={stay.title}
            maxGuests={stay.maxGuests}
          />
        ))}
      </section>
    </main>
  );
}
