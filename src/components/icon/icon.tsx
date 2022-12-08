import { component$, useClientEffect$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './icon.css?inline';

export default component$((props:{ unicode: string, color: 'current'|'brand'| 'success'|'info'|'warning'|'danger', size: '16px'| '24px'| '32px'| '48px'|'64px', role: string, ariaLabel: string }) => {
  useStyles$(styles);
  const iconRef = useSignal<Element>();
  useClientEffect$(() => {
    if (iconRef.value) {
      const iconElement = iconRef.value;
      iconElement.innerHTML = props.unicode;
    }
  });
  return (
    <i style={{'font-size': props.size, 'color': ' --' + props.color + ' '}}  role={props.role} arial-label={props.ariaLabel}  ref={iconRef}>

    </i>
  );
});



