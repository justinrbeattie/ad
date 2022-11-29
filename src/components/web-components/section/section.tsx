import { component$, useClientEffect$, useStyles$ } from '@builder.io/qwik';
import styles from './section.css?inline';

export default component$(() => {
  useStyles$(styles);
  useClientEffect$(() => {
    webComponentInit();
  }, { eagerness: 'load' });



  return (
    <>

      <script></script>
    </>
  );
});


export const webComponentInit = () => {

  const documentHeight = () => {
    document.documentElement.style.setProperty("--page-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", documentHeight);
  documentHeight();


  class PageSection extends HTMLElement {

    intersectionObserver: undefined | IntersectionObserver;
    sectionId: string | null = this.getAttribute('id');
    sentinel: Element | null = this.querySelector('.sentinel');
    scrollContainer = document.documentElement;
    scrollStopInterval: any;
    clamp = (min: number, num: number, max: number) => Math.min(Math.max(num, min), max);
    constructor() {
      super();
      if (this.sentinel) {
        this.intersectionObserver = new IntersectionObserver(
          this._intersectionCallback,
          {
            threshold: Array(1001)
              .fill(0)
              .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
          }
        );
        this.intersectionObserver.observe(
          this.sentinel
        );
      }
    }

    disconnectedCallback() {
      this.intersectionObserver?.disconnect();
    }

    isFirstVisible() {
      const firstVisible = this === this.parentElement?.querySelector("[is='page-section'][data-visible='true']");
      if (firstVisible && this.scrollContainer) {
        this.hashChange();
        const previousScrollProgress: number = Number(document.documentElement.getAttribute('data-scroll-amount')) || 0;
        const scrollingDown = previousScrollProgress <= this.scrollContainer.scrollTop;
        const scrollProgress = (this.scrollContainer.scrollTop / (this.scrollContainer.scrollHeight - window.innerHeight)).toFixed(3);
        const scrollSpeed = this.calculateScrollSpeed(previousScrollProgress);
        document.documentElement.setAttribute('data-scroll-amount', String(this.scrollContainer.scrollTop));
        document.documentElement.setAttribute('data-scroll-direction', scrollingDown ? 'down' : 'up');
        document.documentElement.setAttribute('data-scroll-progress', scrollProgress);
        document.documentElement.setAttribute('data-scroll-speed', scrollSpeed);
        document.documentElement.style.setProperty("--scroll-progress", scrollProgress);
        document.documentElement.style.setProperty("--scroll-amount", String(this.scrollContainer.scrollTop));
        document.documentElement.style.setProperty("--scroll-speed", scrollSpeed);
        this.detectIfScrollingHasStopped();
      }
    }


    hashChange() {
      if (this.sectionId) {
        if ('#' + this.id !== window.location.hash) {
          history.pushState(null, '', '#' + this.id);
        }
      }
    }


    calculateScrollSpeed(previousScrollProgress: number): string {
      const scrollSpeed = Math.abs(this.scrollContainer.scrollTop - previousScrollProgress);
      if (scrollSpeed > 5) {
        return String(scrollSpeed / 100);
      } else {
        return String(0);
      }
    }

    detectIfScrollingHasStopped(): void {
      const position = this.scrollContainer.scrollTop;
      if (this.scrollStopInterval) {
        window.cancelAnimationFrame(this.scrollStopInterval);
      }
      this.scrollStopInterval = window.requestAnimationFrame(() => {
        if (position === this.scrollContainer.scrollTop) {
          document.documentElement.setAttribute('data-scrolling', 'false');
          document.documentElement.setAttribute('data-scroll-speed', '0');
          document.documentElement.style.setProperty("--scroll-speed", '0');
        } else {
          document.documentElement.setAttribute('data-scrolling', 'true');
        }

      });
    }

    _intersectionCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        let ratio = 100;
        if (entry.boundingClientRect.top > 0) {
          ratio = 100 - (100 - entry.intersectionRatio * 50);
        } else {
          ratio = 100 - entry.intersectionRatio * 50;
        }
        const progress = Math.round((ratio / 100) * 10000) / 10000;
        this.style.setProperty("--animation-progress", String(progress));
        this.setAttribute('data-animation-progress', String(progress));

        if (progress === 0 || progress === 1) {
          this.setAttribute('data-visible', 'false');
        } else {
          this.setAttribute('data-visible', 'true');
          this.isFirstVisible();
        }
      });
    };
  }
  customElements.define("page-section", PageSection, { extends: "section" });


}


/* 

 <main>
      <section is="page-section" id="abc">
        <div class="content"><div>aaa</div>



        </div>
        <div class="sentinel-wrapper">
          <div class="sentinel"></div>
        </div>
      </section>

      <section is="page-section" id="def">
        <div class="content"><div>aaa</div>



        </div>
        <div class="sentinel-wrapper">
          <div class="sentinel"></div>
        </div>
      </section>

      <section is="page-section" id="ghi">
        <div class="content"><div>aaa</div>



        </div>
        <div class="sentinel-wrapper">
          <div class="sentinel"></div>
        </div>
      </section>
      <section is="page-section" id="jkl">
        <div class="content"><div>aaa</div>



        </div>
        <div class="sentinel-wrapper">
          <div class="sentinel"></div>
        </div>
      </section>

    </main>
*/