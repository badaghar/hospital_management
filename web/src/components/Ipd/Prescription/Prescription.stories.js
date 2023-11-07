// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Prescription {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Prescription from './Prescription'

export const generated = () => {
  return <Prescription />
}

export default {
  title: 'Components/Prescription',
  component: Prescription,
}
