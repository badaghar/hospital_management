// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NewReturnMedicineTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NewReturnMedicineTable from './NewReturnMedicineTable'

export const generated = () => {
  return <NewReturnMedicineTable />
}

export default {
  title: 'Components/NewReturnMedicineTable',
  component: NewReturnMedicineTable,
}
