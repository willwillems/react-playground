import { use, Suspense, useState, useCallback, useEffect } from 'react';
import useFetch from 'fetch-suspense';

const fetchData = async () => {
  const res = await fetch('https://api.chucknorris.io/jokes/random');
  return res.json();
};

const JokeItem = () => {
  // useFetch uses suspense and kinda works like use() here
  const res = useFetch('https://api.chucknorris.io/jokes/random')
  // default state is fetched data, can't set state when
  // component not rendered
  const [ data, setData ] = useState(res); 

  // the compile auto-memo's this
  const scream = data?.value.toUpperCase();

  // as expected I need some state to handle the refetching
  // suspense handles the intial loading but of course not this
  const [ isLoading, setIsLoading ] = useState(false);
  async function fetchJoke() {
    setIsLoading(true);
    // I have to use regular fetch here, if I use useFetch
    // I get the cached result
    const res = await fetch('https://api.chucknorris.io/jokes/random')
    const json = await res.json()

    setData(json);
    setIsLoading(false);
  }
  return (
    <div 
      className={`${isLoading ? 'bg-blue-50' : 'bg-gray-50'} shadow-md p-4 my-6 rounded-lg`}
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
