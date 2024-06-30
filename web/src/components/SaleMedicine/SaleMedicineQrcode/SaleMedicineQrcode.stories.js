// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <SaleMedicineQrcode {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SaleMedicineQrcode from './SaleMedicineQrcode'

export const generated = () => {
  return <SaleMedicineQrcode />
}

export default {
  title: 'Components/SaleMedicineQrcode',
  component: SaleMedicineQrcode,
}
