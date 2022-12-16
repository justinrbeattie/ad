import { component$, Slot, useClientEffect$, useSignal, useStore, useStyles$ } from '@builder.io/qwik';
import styles from './carousel-item.css?inline';

export interface CarouselItemStore {
  progress: number;
  visible: boolean;
  carouselItemElement: undefined | HTMLElement;
  intersectionRatio: string;
}
export let intersectionObserver: undefined | IntersectionObserver = undefined;
export default component$((props: { width: string, height: string,  attributes?: any }) => {
  useStyles$(styles);
  const store: CarouselItemStore = useStore({
    progress: 0,
    visible: false,
    carouselItemElement: undefined,
    intersectionRatio: ''
  });
  const carouselItemRef = useSignal<Element>();

  useClientEffect$(() => {
    if (carouselItemRef) {
      store.carouselItemElement = carouselItemRef.value as HTMLElement;
      intersectionObserverInit(store);
    }

  });
  return (
    <li ref={carouselItemRef}  {...props.attributes}  data-visible={String(store.visible) || String(false)}  style={{ '--animation-progress': store.progress, '--intersection-ratio': store.intersectionRatio, '--min-width': props.width, '--min-height': props.height }}>
      <Slot></Slot>
    </li>
  );
});

export const intersectionObserverInit = (store: CarouselItemStore) => {
  if (store.carouselItemElement) {
    intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => { _intersectionCallback(store, entries) },
      {
        threshold: Array(1001)
          .fill(0)
          .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
      }
    );
    intersectionObserver.observe(
      store.carouselItemElement
    );
  }
}

export const _intersectionCallback = (store: CarouselItemStore, entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    let ratio = 100;
    if (entry.boundingClientRect.top > 0) {
      ratio = 100 - (100 - entry.intersectionRatio * 50);
    } else {
      ratio = 100 - entry.intersectionRatio * 50;
    }
    store.intersectionRatio = Math.round(entry.intersectionRatio * 100) + "%";
    store.progress = Math.round((ratio / 100) * 10000) / 10000;
    store.visible = (store.progress !== 0 && store.progress !== 1);
  });
};