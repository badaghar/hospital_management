import { render } from '@redwoodjs/testing/web'

import PharmacyWaitingPage from './PharmacyWaitingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PharmacyWaitingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PharmacyWaitingPage />)
    }).not.toThrow()
  })
})
