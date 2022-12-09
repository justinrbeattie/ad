import { component$, useClientEffect$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './icon.css?inline';

export default component$((props: { svg: string, title:string, color: 'current' | 'brand' | 'success' | 'info' | 'warning' | 'danger', size: '16px' | '24px' | '32px' | '48px' | '64px'}) => {
  useStyles$(styles);
  const iconRef = useSignal<Element>();
  useClientEffect$(() => {
    if (iconRef.value) {
      iconRef.value.innerHTML = props.svg;
      const svg = iconRef.value.firstElementChild as SVGElement;
      if(svg) {
        const titleElement = document.createElement('title');
        titleElement.textContent = props.title;
        svg.prepend(titleElement);
      }
    }
  });
  return (
    <i style={{ '--icon-size': 'calc(' + props.size + ')', 'color': ' var(--' + props.color + ') ' }} ref={iconRef}>
    </i>
  );
});