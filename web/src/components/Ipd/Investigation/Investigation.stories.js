// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Investigation {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Investigation from './Investigation'

export const generated = () => {
  return <Investigation />
}

export default {
  title: 'Components/Investigation',
  component: Investigation,
}
