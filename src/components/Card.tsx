import { Props } from './HomeCard';

export function Card({
  photo,
  beds,
  superHost,
  rating,
  type,
  title,
  maxGuests,
}: Props) {
  return (
    <div className='flex flex-col gap-2 my-6 hover:bg-gray-400/20 rounded-2xl p-2'>
      <div className='relative'>
        <img src={photo} alt='' className='rounded-3xl max-h-[190px] w-full' />
        {superHost && (
          <p className='absolute top-3 left-3 max-w-fit font-montserrat font-bold text-gray-500 text-xs px-2 py-1 border border-gray-500 rounded-xl bg-white-200/50'>
            SUPER HOST
          </p>
        )}
      </div>
      <div className='font-montserrat flex justify-between items-center'>
        <h2 className='font-semibold text-md text-gray-700'>{title}</h2>
      </div>
      <div className='flex justify-between items-center text-sm text-gray-400 font-medium'>
        <div>
          <p>{type}</p>
          <p>{beds} beds</p>
          <p>Max {maxGuests} guests</p>
        </div>

        <div className='flex gap-1 items-center text-sm self-end'>
          <span className='material-symbols-outlined text-red-500/70'>
            star
          </span>
          <p className='text-gray-500 font-medium'>{rating}</p>
        </div>
      </div>
    </div>
  );
}
