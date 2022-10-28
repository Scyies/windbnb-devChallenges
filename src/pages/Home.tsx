import stays from '../../stays.json';
import { HomeCard } from '../components/HomeCard';
import { v4 } from 'uuid';

export function Home() {
  return (
    <main className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 flex-1 mx-3 md:mx-24 min-h-[calc(100vh-144px)]'>
      {stays.map((stay) => (
        <HomeCard
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
    </main>
  );
}
