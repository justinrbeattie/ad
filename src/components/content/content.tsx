import { component$, Slot, useStyles$} from '@builder.io/qwik';
import styles from './content.css?inline';

export default component$((props: {attributes: any}) => {
  useStyles$(styles);
  return (
    <div  class="content"  {...props.attributes} >
      <Slot></Slot>
    </div>
  );
});