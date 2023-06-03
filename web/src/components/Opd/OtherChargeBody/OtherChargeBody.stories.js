// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <OtherChargeBody {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import OtherChargeBody from './OtherChargeBody'

export const generated = () => {
  return <OtherChargeBody />
}

export default {
  title: 'Components/OtherChargeBody',
  component: OtherChargeBody,
}
