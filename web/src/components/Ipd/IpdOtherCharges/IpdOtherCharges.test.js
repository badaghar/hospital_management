import { render } from '@redwoodjs/testing/web'

import IpdOtherCharges from './IpdOtherCharges'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpdOtherCharges', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpdOtherCharges />)
    }).not.toThrow()
  })
})
