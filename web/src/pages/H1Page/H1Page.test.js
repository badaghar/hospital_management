import { render } from '@redwoodjs/testing/web'

import H1Page from './H1Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H1Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H1Page />)
    }).not.toThrow()
  })
})
