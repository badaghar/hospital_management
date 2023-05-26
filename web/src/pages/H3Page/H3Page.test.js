import { render } from '@redwoodjs/testing/web'

import H3Page from './H3Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H3Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H3Page />)
    }).not.toThrow()
  })
})
