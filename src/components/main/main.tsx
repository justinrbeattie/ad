import { component$, Slot} from '@builder.io/qwik';

export default component$((props: {attributes: any}) => {

  return (
    <main    {...props.attributes} >
      <Slot></Slot>
    </main>
  );
});