// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <DoctorChargeBody {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import DoctorChargeBody from './DoctorChargeBody'

export const generated = () => {
  return <DoctorChargeBody />
}

export default {
  title: 'Components/DoctorChargeBody',
  component: DoctorChargeBody,
}
