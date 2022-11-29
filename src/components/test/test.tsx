import { component$, Slot, useStore } from "@builder.io/qwik";

export const MyFunComponent = component$((props: { text: string, children:Array<any> }) => {
    const state = useStore({
      count: 0,
    });
  
    return (
      <div>
        <h3>{props.text.toUpperCase()}</h3>
        <p>{state.count}</p>
        <button onClick$={() => state.count++}>Click me</button>
        <Slot></Slot>
      </div>
    );
  });