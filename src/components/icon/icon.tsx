import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './icon.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <i>
      &#xf107;
    </i>
  );
});
