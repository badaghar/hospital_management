import { render } from '@redwoodjs/testing/web'

import DoctorChargeBody from './DoctorChargeBody'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DoctorChargeBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DoctorChargeBody />)
    }).not.toThrow()
  })
})
