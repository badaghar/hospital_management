// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Complaint {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Complaint from './Complaint'

export const generated = () => {
  return <Complaint />
}

export default {
  title: 'Components/Complaint',
  component: Complaint,
}
