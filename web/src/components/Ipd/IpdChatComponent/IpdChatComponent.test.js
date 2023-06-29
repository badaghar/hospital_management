import { render } from '@redwoodjs/testing/web'

import IpdChatComponent from './IpdChatComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpdChatComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpdChatComponent />)
    }).not.toThrow()
  })
})
