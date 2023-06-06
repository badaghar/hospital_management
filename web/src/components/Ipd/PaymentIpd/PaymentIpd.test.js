import { render } from '@redwoodjs/testing/web'

import PaymentIpd from './PaymentIpd'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PaymentIpd', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PaymentIpd />)
    }).not.toThrow()
  })
})
