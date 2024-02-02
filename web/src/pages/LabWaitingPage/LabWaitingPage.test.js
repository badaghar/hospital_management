import { render } from '@redwoodjs/testing/web'

import LabWaitingPage from './LabWaitingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LabWaitingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LabWaitingPage />)
    }).not.toThrow()
  })
})
