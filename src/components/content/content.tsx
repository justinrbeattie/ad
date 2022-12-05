import { component$, Slot} from '@builder.io/qwik';


export default component$((props: {attributes: any}) => {

  return (
    <div    {...props.attributes} >
      <Slot></Slot>
    </div>
  );
});