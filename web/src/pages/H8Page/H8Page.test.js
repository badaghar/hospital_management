import { render } from '@redwoodjs/testing/web'

import H8Page from './H8Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H8Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H8Page />)
    }).not.toThrow()
  })
})
