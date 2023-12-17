import { render } from '@redwoodjs/testing/web'

import IpdHistory from './IpdHistory'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpdHistory', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpdHistory />)
    }).not.toThrow()
  })
})
