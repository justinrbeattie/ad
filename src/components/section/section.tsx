import { component$, Slot, useClientEffect$, useSignal, useStore, useStyles$ } from '@builder.io/qwik';
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

export default component$((props: { id: string, rows: Rows, attributes: any }) => {
  const rowStyle =  {'--xs-rows': props.rows.xs, '--sm-rows': props.rows.sm, '--md-rows': props.rows.md, '--lg-rows': props.rows.lg, '--xl-rows': props.rows.xl, '--xxl-row': props.rows.xxl};
  useStyles$(styles);
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
    <section   {...props.attributes} data-visible={String(store.visible)}
      style={{ '--animation-progress': store.progress, ...rowStyle}}
      ref={sectionRef}>
      <div className={
        "section-content " +
        (store.progress > 0 ? ' animation-progress-0 ' : '') +
        (store.progress > 0.25 ? ' animation-progress-25 ' : '') +
        (store.progress > 0.5 ? ' animation-progress-50 ' : '') +
        (store.progress > 0.75 ? ' animation-progress-75 ' : '') +
        (store.progress === 1 ? ' animation-progress-100 ' : '')
        }>
        <Slot></Slot>
      </div>
      <div className="sentinel-wrapper">
        <div className="sentinel" ref={sentinelRef}></div>
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

export const _intersectionCallback = (store: SectionStore, entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    let ratio = 100;
    if (entry.boundingClientRect.top > 0) {
      ratio = 100 - (100 - entry.intersectionRatio * 50);
    } else {
      ratio = 100 - entry.intersectionRatio * 50;
    }
    store.progress = Math.round((ratio / 100) * 10000) / 10000;
    store.visible = (store.progress !== 0 && store.progress !== 1);
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

export interface Rows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}
