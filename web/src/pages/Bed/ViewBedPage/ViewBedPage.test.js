import { render } from '@redwoodjs/testing/web'

import ViewBedPage from './ViewBedPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewBedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewBedPage />)
    }).not.toThrow()
  })
})
