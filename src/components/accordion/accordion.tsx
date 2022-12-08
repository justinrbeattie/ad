import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import Icon from '../icon/icon';
import styles from './accordion.css?inline';

export default component$((props: { heading: string}) => {
  useStyles$(styles);
  return (
    <details>
    <summary>
    <Icon unicode="&#xf105;" color="current" size="16px" role="image" ariaLabel="expand"/> <div>{props.heading}</div> 
    </summary>
    <div>
      <Slot></Slot>
    </div>
  </details>
  );
});
