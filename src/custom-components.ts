import { RegisteredComponent } from "@builder.io/sdk-qwik";
import Main from "~/components/main/main";
import Section from "~/components/section/section";
import Content from "~/components/content/content";
import Accordion from "~/components/accordion/accordion";
import Icon from "~/components/icon/icon";
import Carousel from "~/components/carousel/carousel";
import CarouselItem from "./components/carousel/carousel-item";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Main,
    name: 'Main',
    description: 'This element represents the dominant content of the page.',
    image: 'https://img.icons8.com/ios/50/null/overview-pages-1.png',
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
    description: 'A section is a thematic grouping of content, typically with a heading',
    image: 'https://img.icons8.com/ios/50/null/continuous-mode.png',
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
        type: 'object',
        defaultValue: {
          xs: '5'
        },
        subFields: [
          {
            name: 'xs',
            type: 'string',
            defaultValue: '5',
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
  {
    component: Content,
    name: 'Content',
    description: 'This element is a child of a section & usually contains general content such as images & text. This element also is a CSS grid child with settings to control size & position.',
    image: 'https://img.icons8.com/ios/50/null/content.png',
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
  {
    component: Accordion,
    name: 'Accordion',
    description: 'An Accordion provides an expandable details-summary view.',
    image: 'https://img.icons8.com/ios/50/null/resize-vertical.png',
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
        name: 'heading',
        type: 'string',
        defaultValue: 'Accordion Heading',
      },
      {
        name: 'open',
        type: 'boolean',
        defaultValue: false,
      },
    ],
  },

  {
    component: Icon,
    name: 'Icon',
    description: 'A symbol or graphic representation on a screen of a program, option, or window.',
    image: 'https://img.icons8.com/ios/50/null/large-icons.png',
    builtIn: true,
    noWrap: true,
    inputs: [
      {
        name: 'svg',
        type: 'longText',
        defaultValue: '',
      },
      {
        name: 'color',
        type: 'text',
        enum: ['current', 'brand', 'success', 'info', 'warning', 'danger'],
        defaultValue: 'brand',
      },
      {
        name: 'size',
        type: 'text',
        enum: ['16px', '24px', '32px', '48px', '64px'],
        defaultValue: '24px',
      },
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Expand collapse my content accordion',
      },
    ],
  },

  {
    component: Carousel,
    name: 'Carousel',
    description: 'A symbol or graphic representation on a screen of a program, option, or window.',
    image: 'https://img.icons8.com/ios/50/null/large-icons.png',
    builtIn: true,
    noWrap: true,
    canHaveChildren: true,
    defaultChildren: [
      {
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Carousel Item'}
      }
    ],
    childRequirements: {
      message: 'You can only put Carousel Item Blocks in a Carousel',
      query: {
        'component.name': { $in: ['Carousel Item'] },
      }
    },
  },
  {
    component: CarouselItem,
    name: 'Carousel Item',
    description: 'A symbol or graphic representation on a screen of a program, option, or window.',
    image: 'https://img.icons8.com/ios/50/null/large-icons.png',
    builtIn: true,
    noWrap: true,
    inputs: [
      {
        name: 'width',
        type: 'string',
        defaultValue: '400px'
      }
    ]
  },
];