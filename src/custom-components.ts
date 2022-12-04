import { RegisteredComponent } from "@builder.io/sdk-qwik";
import Main from "~/components/main/main";
import Section from "~/components/section/section";


export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Main,
    name: 'Main',
    builtIn: true,
    noWrap:true,
    canHaveChildren: true,
    defaultChildren: [
      {
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Section' }
      }
    ],
    childRequirements: {
      message: 'You can only put Sections in a Main Tag',
      query: {
        'component.name': { $in: ['Section'] },
      }
    }
  },
  {
    component: Section,
    name: 'Section',
    builtIn: true,
    noWrap:true,
    canHaveChildren: true,
    defaultChildren: [
      {
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Text', options: { text: 'I am child text block!' } }
      }
    ],
    inputs: [
      {
        name: 'id',
        type: 'string',
        defaultValue: '',
      },
    ],
  },
];

