// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <PaymentIpd {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import PaymentIpd from './PaymentIpd'

export const generated = () => {
  return <PaymentIpd />
}

export default {
  title: 'Components/PaymentIpd',
  component: PaymentIpd,
}
