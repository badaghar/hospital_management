// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Permissions {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Permissions from './Permissions'

export const generated = () => {
  return <Permissions />
}

export default {
  title: 'Components/Permissions',
  component: Permissions,
}
