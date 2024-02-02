import { render } from '@redwoodjs/testing/web'

import Investigation from './Investigation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Investigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Investigation />)
    }).not.toThrow()
  })
})
