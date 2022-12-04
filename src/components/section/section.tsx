import { component$, useClientEffect$, useSignal, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './section.css?inline';

export interface SectionStore {
  id: string;
  progress: number;
  visible: boolean;
  sectionElementRef: undefined | HTMLElement;
  sentinelElementRef: undefined | HTMLElement;
}


export let intersectionObserver: undefined | IntersectionObserver = undefined;
export let scrollStopInterval: undefined | number;

export default component$((props: { id: string }) => {
  useStylesScoped$(styles);
  const store: SectionStore = useStore({
    id: props.id,
    progress: 0,
    visible: false,
    sectionElementRef: undefined,
    sentinelElementRef: undefined,
  });
  const sectionRef = useSignal<Element>();
  const sentinelRef = useSignal<Element>()

  useClientEffect$(() => {
    if (sectionRef.value && sentinelRef.value) {
      store.sectionElementRef = sectionRef.value as HTMLElement;
      store.sentinelElementRef = sentinelRef.value as HTMLElement;
      intersectionObserverInit(store);
    }
  });

  return (
    <section data-visible={String(store.visible)} style={{ '--animation-progress': store.progress }} ref={sectionRef}>
      <div class="content">
        <div>{store.progress}</div>
      </div>
      <div class="sentinel-wrapper">
        <div class="sentinel" ref={sentinelRef}></div>
      </div>
    </section>
  );
});

export const intersectionObserverInit = (store: SectionStore) => {
  if (store.sectionElementRef && store.sentinelElementRef) {
    intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => { _intersectionCallback(store, entries) },
      {
        threshold: Array(1001)
          .fill(0)
          .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
      }
    );
    intersectionObserver.observe(
      store.sentinelElementRef
    );
  }
}

export const _intersectionCallback = (store: any, entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    let ratio = 100;
    if (entry.boundingClientRect.top > 0) {
      ratio = 100 - (100 - entry.intersectionRatio * 50);
    } else {
      ratio = 100 - entry.intersectionRatio * 50;
    }
    store.progress = Math.round((ratio / 100) * 10000) / 10000;
    store.visible = (store.progress !== 0 && store.progress !== 1);
    store.scrollY = window.scrollY;
    isFirstVisible(store);
  });
};

export const isFirstVisible = (store: SectionStore) => {

    const firstVisible = store.sectionElementRef === document.body.querySelector("section[data-visible='true']");

    if (firstVisible) {
      hashChange(store);
      const previousScrollProgress: number = Number(document.body.getAttribute('data-scroll-amount')) || 0;
      const scrollingDown = previousScrollProgress <= window.scrollY;
      const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)).toFixed(3);
      const scrollSpeed = calculateScrollSpeed(previousScrollProgress);
      document.documentElement.setAttribute('data-scroll-amount', String(window.scrollY));
      document.documentElement.setAttribute('data-scroll-direction', scrollingDown ? 'down' : 'up');
      document.documentElement.setAttribute('data-scroll-progress', scrollProgress);
      document.documentElement.setAttribute('data-scroll-speed', scrollSpeed);
      document.documentElement.style.setProperty("--scroll-progress", scrollProgress);
      document.documentElement.style.setProperty("--scroll-amount", String(window.scrollY));
      document.documentElement.style.setProperty("--scroll-speed", scrollSpeed);
     detectIfScrollingHasStopped();
    }
}

export const hashChange = (store: SectionStore) => {
  if (store.id) {
    if ('#' + store.id !== window.location.hash) {
      history.pushState(null, '', '#' + store.id);
    }
  }
}

export const calculateScrollSpeed = (previousScrollProgress: number): string => {
    const scrollSpeed = Math.abs(window.scrollY - previousScrollProgress);
    if (scrollSpeed > 5) {
      return String(scrollSpeed / 100);
    }
  return String(0);
}

export const detectIfScrollingHasStopped = (): void => {
  const position = window.scrollY;
  if (scrollStopInterval) {
    window.cancelAnimationFrame(scrollStopInterval);
  }
  scrollStopInterval = window.requestAnimationFrame(() => {
      if (position === window.scrollY) {
        document.documentElement.setAttribute('data-scrolling', 'false');
        document.documentElement.setAttribute('data-scroll-speed', '0');
        document.documentElement.style.setProperty("--scroll-speed", '0');
      } else {
        document.documentElement.setAttribute('data-scrolling', 'true');
    }


  });
}