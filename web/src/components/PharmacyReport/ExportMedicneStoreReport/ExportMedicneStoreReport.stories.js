// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ExportMedicneStoreReport {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ExportMedicneStoreReport from './ExportMedicneStoreReport'

export const generated = () => {
  return <ExportMedicneStoreReport />
}

export default {
  title: 'Components/ExportMedicneStoreReport',
  component: ExportMedicneStoreReport,
}
