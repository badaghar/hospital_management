import { render } from '@redwoodjs/testing/web'

import H7Page from './H7Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H7Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H7Page />)
    }).not.toThrow()
  })
})
