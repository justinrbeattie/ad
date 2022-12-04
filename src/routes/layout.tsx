import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <Header />
      <div>
        <Slot />
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
      </div>

      
  
    </>
  );
});
/* new main custom component that only accepts sections */ 
/* new Drawers custom component that encapsulates layout */