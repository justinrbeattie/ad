import { component$,useStyles$ } from '@builder.io/qwik';
import styles from './icon.css?inline';

export default component$((props:{ unicode: string, color: 'current'|'brand'| 'success'|'info'|'warning'|'danger', size: '16px'| '24px'| '32px'| '48px'|'64px', role: string, ariaLabel: string }) => {
  useStyles$(styles);
  return (
    <i data-unicode={'&#x' + props.unicode + ';'} style={{'font-size': props.size, 'width':'calc(' + props.size + ' + 8px )', 'height':'calc(' + props.size + ' + 8px )', 'color': ' var(--' + props.color + ') '}}  role={props.role} arial-label={props.ariaLabel} >

    </i>
  );
});



