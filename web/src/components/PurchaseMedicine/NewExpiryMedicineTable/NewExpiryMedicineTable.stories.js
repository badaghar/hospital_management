// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NewExpiryMedicineTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NewExpiryMedicineTable from './NewExpiryMedicineTable'

export const generated = () => {
  return <NewExpiryMedicineTable />
}

export default {
  title: 'Components/NewExpiryMedicineTable',
  component: NewExpiryMedicineTable,
}
