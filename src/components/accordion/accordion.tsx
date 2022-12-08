import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import styles from './accordion.css?inline';

export default component$((props: { heading: string}) => {
  useStyles$(styles);
  return (
    <details>
    <summary>
      <div>{props.heading}</div>
    </summary>
    <div>
      <Slot></Slot>
    </div>
  </details>
  );
});
