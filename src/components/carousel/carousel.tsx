import { component$, useClientEffect$, useSignal, useStyles$ } from '@builder.io/qwik';
import Icon from '../icon/icon';
import styles from './carousel.css?inline';

export default component$((props: { attributes: any }) => {
  useStyles$(styles);
  const carouselRef = useSignal<Element>();
  const ulRef = useSignal<Element>();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="50" height="50"
  viewBox="0 0 50 50">
  <path d="M 14.988281 3.992188 C 14.582031 3.992188 14.21875 4.238281 14.0625 4.613281 C 13.910156 4.992188 14 5.421875 14.292969 5.707031 L 33.585938 25 L 14.292969 44.292969 C 14.03125 44.542969 13.925781 44.917969 14.019531 45.265625 C 14.109375 45.617188 14.382813 45.890625 14.734375 45.980469 C 15.082031 46.074219 15.457031 45.96875 15.707031 45.707031 L 35.707031 25.707031 C 36.097656 25.316406 36.097656 24.683594 35.707031 24.292969 L 15.707031 4.292969 C 15.519531 4.097656 15.261719 3.992188 14.988281 3.992188 Z"></path>
  </svg>`

  useClientEffect$(() => {
    if (carouselRef && ulRef) {

      /*       intersectionObserverInit(store); */
    }
  });
  return (
    <div carousel="" ref={carouselRef}  {...props.attributes} class="carousel">
      <button onClick$={() => console.log(this)}>
        <Icon svg={svg} color="current" size="16px" title={'Previous Items'} />
      </button>
      <ul ref={ulRef} >
        <li is="carousel-list-item">
          <article>SLIDE 1</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 2</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 3</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 4</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 5</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 6</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 7</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 8</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 9</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 10</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 11</article>
        </li>
        <li is="carousel-list-item">
          <article>SLIDE 12</article>
        </li>
      </ul>
      <button onClick$={() => console.log(this)}>
      <Icon svg={svg} color="current" size="16px" title={'Previous Items'} />
      </button>
    </div>
  );
});
