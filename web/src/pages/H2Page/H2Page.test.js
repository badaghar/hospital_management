import { render } from '@redwoodjs/testing/web'

import H2Page from './H2Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H2Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H2Page />)
    }).not.toThrow()
  })
})
