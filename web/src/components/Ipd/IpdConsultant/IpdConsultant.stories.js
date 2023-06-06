// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <IpdConsultant {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import IpdConsultant from './IpdConsultant'

export const generated = () => {
  return <IpdConsultant />
}

export default {
  title: 'Components/IpdConsultant',
  component: IpdConsultant,
}
