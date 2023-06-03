import { render } from '@redwoodjs/testing/web'

import OtherChargeBody from './OtherChargeBody'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OtherChargeBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OtherChargeBody />)
    }).not.toThrow()
  })
})
