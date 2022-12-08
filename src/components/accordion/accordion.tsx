import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import Icon from '../icon/icon';
import styles from './accordion.css?inline';

export default component$((props: { heading: string}) => {
  useStyles$(styles);
  return (
    <details>
    <summary>
      <div>{props.heading}</div> <Icon unicode="&#xf105;" color="current" size="16px" role="image" ariaLabel="expand"/> 
    </summary>
    <div>
      <Slot></Slot>
    </div>
  </details>
  );
});
