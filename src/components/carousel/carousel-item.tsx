import { component$, Slot, useClientEffect$, useSignal, useStore, useStyles$ } from '@builder.io/qwik';
import styles from './carousel-item.css?inline';

export interface CarouselItemStore {
  progress: string;
  visible: boolean;
  partiallyVisible: boolean;
  invisible: boolean;
  carouselItemElement: undefined | HTMLElement;
  intersectionRatio: string;
}
export let intersectionObserver: undefined | IntersectionObserver = undefined;
export default component$((props: { width: string, attributes?: any }) => {
  useStyles$(styles);
  const store: CarouselItemStore = useStore({
    progress: '0',
    visible: false,
    partiallyVisible: false,
    invisible: true,
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
    <li ref={carouselItemRef}  {...props.attributes} 
    data-visible={String(store.visible) || String(false)} 
    data-partially-visible={String(store.partiallyVisible) || String(false)} 
    data-invisible={String(store.invisible) || String(false)} 
    style={{ '--intersection-ratio': store.intersectionRatio, '--min-width': props.width }}>
      <Slot></Slot>
      {store.progress}
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
    setItemProgress(store);
  }
}

export const _intersectionCallback = (store: CarouselItemStore, entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    store.intersectionRatio = Math.round(entry.intersectionRatio * 100) + "%";
    store.visible = entry.intersectionRatio === 1;
    store.partiallyVisible = entry.intersectionRatio < 1 && entry.intersectionRatio > 0;
    store.invisible = entry.intersectionRatio === 0;
    setItemProgress(store);
  });
};

export const setItemProgress = (store: CarouselItemStore) => {
  const ul = store.carouselItemElement?.parentElement;
  if (ul) {
    for (const child of ul.querySelectorAll("[data-invisible='false']")) {
      const li = child as HTMLElement;
      const offset = ul.offsetWidth - (li.getBoundingClientRect().left - ul.getBoundingClientRect().left);
      const progress = (offset / ul.offsetWidth).toFixed(3);
      li.style.setProperty('--carousel-item-progress', progress);
    }
  }
}