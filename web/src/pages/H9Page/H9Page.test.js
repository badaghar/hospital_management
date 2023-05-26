import { render } from '@redwoodjs/testing/web'

import H9Page from './H9Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('H9Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H9Page />)
    }).not.toThrow()
  })
})
