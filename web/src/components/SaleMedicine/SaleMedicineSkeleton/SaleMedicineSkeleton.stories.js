// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <SaleMedicineSkeleton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SaleMedicineSkeleton from './SaleMedicineSkeleton'

export const generated = () => {
  return <SaleMedicineSkeleton />
}

export default {
  title: 'Components/SaleMedicineSkeleton',
  component: SaleMedicineSkeleton,
}
