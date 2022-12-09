import { component$, Slot} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$((props: {attributes: any}) => {
  const location = useLocation();

  return (
    <main className={location.query.__builder_editing__ === 'true'? 'editing' : ''} {...props.attributes} >
      <Slot></Slot>
    </main>
  );
});