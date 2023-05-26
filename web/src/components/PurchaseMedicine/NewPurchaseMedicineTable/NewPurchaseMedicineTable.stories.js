// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NewPurchaseMedicineTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NewPurchaseMedicineTable from './NewPurchaseMedicineTable'

export const generated = () => {
  return <NewPurchaseMedicineTable />
}

export default {
  title: 'Components/NewPurchaseMedicineTable',
  component: NewPurchaseMedicineTable,
}
