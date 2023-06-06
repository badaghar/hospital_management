// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <IpdOtherCharges {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import IpdOtherCharges from './IpdOtherCharges'

export const generated = () => {
  return <IpdOtherCharges />
}

export default {
  title: 'Components/IpdOtherCharges',
  component: IpdOtherCharges,
}
