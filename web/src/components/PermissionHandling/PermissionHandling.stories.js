// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <PermissionHandling {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import PermissionHandling from './PermissionHandling'

export const generated = () => {
  return <PermissionHandling />
}

export default {
  title: 'Components/PermissionHandling',
  component: PermissionHandling,
}
