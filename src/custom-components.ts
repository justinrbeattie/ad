import { RegisteredComponent } from "@builder.io/sdk-qwik";
import { MyFunComponent } from "./components/test/test";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
    {
      component: MyFunComponent,
      name: 'MyFunComponent',
      builtIn: true,
      inputs: [
        {
          name: 'text',
          type: 'string',
          defaultValue: 'Hello world',
        },
      ],
    },
  ];