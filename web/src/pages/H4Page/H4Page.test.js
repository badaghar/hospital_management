import { render } from '@redwoodjs/testing/web'

import H4Page from './H4Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H4Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H4Page />)
    }).not.toThrow()
  })
})
