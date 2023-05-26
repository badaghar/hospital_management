import { render } from '@redwoodjs/testing/web'

import H6Page from './H6Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H6Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H6Page />)
    }).not.toThrow()
  })
})
