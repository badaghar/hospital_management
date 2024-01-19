import { render } from '@redwoodjs/testing/web'

import DrWaitingPage from './DrWaitingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DrWaitingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DrWaitingPage />)
    }).not.toThrow()
  })
})
