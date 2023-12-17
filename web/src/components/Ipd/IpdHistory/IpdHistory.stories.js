// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <IpdHistory {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import IpdHistory from './IpdHistory'

export const generated = () => {
  return <IpdHistory />
}

export default {
  title: 'Components/IpdHistory',
  component: IpdHistory,
}
