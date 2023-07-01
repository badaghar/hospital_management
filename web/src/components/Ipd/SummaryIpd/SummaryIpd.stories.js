// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <SummaryIpd {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SummaryIpd from './SummaryIpd'

export const generated = () => {
  return <SummaryIpd />
}

export default {
  title: 'Components/SummaryIpd',
  component: SummaryIpd,
}
