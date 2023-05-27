// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <SearchTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SearchTable from './SearchTable'

export const generated = () => {
  return <SearchTable />
}

export default {
  title: 'Components/SearchTable',
  component: SearchTable,
}
