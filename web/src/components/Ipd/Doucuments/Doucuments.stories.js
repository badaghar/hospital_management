// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Doucuments {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Doucuments from './Doucuments'

export const generated = () => {
  return <Doucuments />
}

export default {
  title: 'Components/Doucuments',
  component: Doucuments,
}
