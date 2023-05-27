// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NewSaleMedicineTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NewSaleMedicineTable from './NewSaleMedicineTable'

export const generated = () => {
  return <NewSaleMedicineTable />
}

export default {
  title: 'Components/NewSaleMedicineTable',
  component: NewSaleMedicineTable,
}
