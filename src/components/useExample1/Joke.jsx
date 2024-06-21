import { Suspense } from 'react';
import { signal } from "@preact/signals-react";
import useSWR from 'swr'

import { Todo } from '../../store/todo';
import { observer } from 'mobx-react-lite';

const count = signal(1);

const TodoView = observer(({ todo }) => {
  console.log('Rendering: TodoView')
  return <div>
    <button onClick={(ev) => ev.stopPropagation()} onMouseDown={() => {todo.urgentize()}}>Urgent</button>
    <h2>{todo.title}</h2>
  </div>
})

// fetch with 1s delay built in
const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => new Promise((resolve) => setTimeout(() => resolve(data), 1000)));

const JokeItem = () => {
  console.log('Rendering: JokeItem')
  // useFetch uses suspense and kinda works like use() here
  const { data, error, isValidating, mutate } = useSWR("https://api.chucknorris.io/jokes/random", fetcher, { suspense: true });


  // the compile auto-memo's this
  const scream = data?.value?.toUpperCase();

  const todo = new Todo(data.value);

  async function fetchJoke () {
    await mutate();
    count.value = count.value + 1;
    console.log('fetchJoke', count.value)
  }


  return (
    <div 
      className={`${isValidating ? 'bg-blue-50' : 'bg-gray-50'} shadow-md p-4 my-6 rounded-lg`}
      onClick={fetchJoke}
    >
      {/* <h2 className='text-xl font-bold'>{scream}</h2> */}
      <TodoView todo={todo} />
    </div>
  );
};


// h1 element with count.value
const Counter = ({ count }) => {
  console.log('Rendering: Counter')
	// useSignals();

  console.log('count', count.value)
  const countString = `(#${count.value})`

  return <h1>{ countString }</h1>
}

const Joke = () => {
  console.log('Rendering: Joke')
	// useSignals();
  return (
    <Suspense
      fallback={
        <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>
      }
    >
      <title>Chuck Norris Jokes</title>
      <meta name='description' content='Chuck Norris jokes' />
      <meta name='keywords' content='chuck norris, jokes' />

      <Counter count={count} />
      <JokeItem />
    </Suspense>
  );
};
export { Joke as UseExample1 };
