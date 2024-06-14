import { Suspense } from 'react';
import useSWR from 'swr'

// fetch with 1s delay built in
const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => new Promise((resolve) => setTimeout(() => resolve(data), 1000)));

const JokeItem = () => {
  // useFetch uses suspense and kinda works like use() here
  const { data, error, isValidating, mutate } = useSWR("https://api.chucknorris.io/jokes/random", fetcher, { suspense: true });


  // the compile auto-memo's this
  const scream = data?.value.toUpperCase();

  function fetchJoke () {
    mutate();
  }

  return (
    <div 
      className={`${isValidating ? 'bg-blue-50' : 'bg-gray-50'} shadow-md p-4 my-6 rounded-lg`}
      onClick={fetchJoke}
    >
      <h2 className='text-xl font-bold'>{scream}</h2>
    </div>
  );
};

const Joke = () => {
  return (
    <Suspense
      fallback={
        <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>
      }
    >
      <title>Chuck Norris Jokes</title>
      <meta name='description' content='Chuck Norris jokes' />
      <meta name='keywords' content='chuck norris, jokes' />

      <JokeItem />
    </Suspense>
  );
};
export { Joke as UseExample1 };
