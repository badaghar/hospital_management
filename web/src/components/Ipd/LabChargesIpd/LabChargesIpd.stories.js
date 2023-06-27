// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <LabChargesIpd {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LabChargesIpd from './LabChargesIpd'

export const generated = () => {
  return <LabChargesIpd />
}

export default {
  title: 'Components/LabChargesIpd',
  component: LabChargesIpd,
}
