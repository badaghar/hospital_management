// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <DownloadPurchaseReport {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import DownloadPurchaseReport from './DownloadPurchaseReport'

export const generated = () => {
  return <DownloadPurchaseReport />
}

export default {
  title: 'Components/DownloadPurchaseReport',
  component: DownloadPurchaseReport,
}
