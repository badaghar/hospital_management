import { render } from '@redwoodjs/testing/web'

import H5Page from './H5Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H5Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H5Page />)
    }).not.toThrow()
  })
})
