import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
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
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
