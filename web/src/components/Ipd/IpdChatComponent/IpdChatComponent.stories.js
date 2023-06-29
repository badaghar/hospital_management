// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <IpdChatComponent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import IpdChatComponent from './IpdChatComponent'

export const generated = () => {
  return <IpdChatComponent />
}

export default {
  title: 'Components/IpdChatComponent',
  component: IpdChatComponent,
}
