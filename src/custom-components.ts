import { RegisteredComponent } from "@builder.io/sdk-qwik";
import Main from "~/components/main/main";
import Section from "~/components/section/section";
import Content from "~/components/content/content";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Main,
    name: 'Main',
    builtIn: true,
    noWrap: true,
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
    noWrap: true,
    canHaveChildren: true,
    defaultChildren: [
      {
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Content' }
      }
    ],
    childRequirements: {
      message: 'You can only put Content Blocks in a Section Tag',
      query: {
        'component.name': { $in: ['Content'] },
      }
    },
    inputs: [
      {
        name: 'id',
        type: 'string',
        defaultValue: '',
      },
      {
        name: 'rows',
        type: 'number',
        defaultValue: 5,
      },
    ],
  },
  {
    component: Content,
    name: 'Content',
    builtIn: true,
    noWrap: true,
    canHaveChildren: true,
    defaultChildren: [
      {
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Text' }
      }
    ],
    inputs: [
      {
        name: 'columns',
        type: 'object',
        defaultValue: {
          defaultValue: {
            xs: 'col 1 / span 12'
          },
          subFields: [
            {
              name: 'xs',
              type: 'string',
              defaultValue: 'col 1 / span 12',
              required: true,
            },
            {
              name: 'sm',
              type: 'string',
            },
            {
              name: 'md',
              type: 'string',
            },
            {
              name: 'lg',
              type: 'string',
            },
            {
              name: 'xl',
              type: 'string',
            },
            {
              name: 'xxl',
              type: 'string',
            },
          ],
        },
      },
      {
        name: 'rows',
        type: 'object',
        defaultValue: {
          xs: 'row 1/ span 2'
        },
        subFields: [
          {
            name: 'xs',
            type: 'string',
            defaultValue: 'row 1 / span 2',
            required: true,
          },
          {
            name: 'sm',
            type: 'string',
          },
          {
            name: 'md',
            type: 'string',
          },
          {
            name: 'lg',
            type: 'string',
          },
          {
            name: 'xl',
            type: 'string',
          },
          {
            name: 'xxl',
            type: 'string',
          },
        ],

      },
    ],
  },
];

