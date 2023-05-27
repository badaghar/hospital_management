// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <DownloadSaleMedicine {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import DownloadSaleMedicine from './DownloadSaleMedicine'

export const generated = () => {
  return <DownloadSaleMedicine />
}

export default {
  title: 'Components/DownloadSaleMedicine',
  component: DownloadSaleMedicine,
}
