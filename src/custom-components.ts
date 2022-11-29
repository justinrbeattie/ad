import { RegisteredComponent } from "@builder.io/sdk-qwik";
import { MyFunComponent } from "./components/test/test";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
    {
      component: MyFunComponent,
      name: 'MyFunComponent',
      builtIn: true,
      canHaveChildren:true,
      defaultChildren: [
        { 
          '@type': '@builder.io/sdk:Element',
          component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
      ],
      inputs: [
        {
          name: 'text',
          type: 'string',
          defaultValue: 'Hello world',
        },
      ],
    },
  ];