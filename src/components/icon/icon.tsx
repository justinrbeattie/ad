import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './icon.css?inline';

export default component$((props:{ unicode: string, color: string, size: string, role: string, ariaLabel: string }) => {
  useStyles$(styles);

  return (
    <i style={{'font-size': props.size}}  role={props.role} arial-label={props.ariaLabel}>
    {props.unicode}
    </i>
  );
});



