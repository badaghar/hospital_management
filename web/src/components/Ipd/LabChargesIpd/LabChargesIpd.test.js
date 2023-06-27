import { render } from '@redwoodjs/testing/web'

import LabChargesIpd from './LabChargesIpd'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LabChargesIpd', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LabChargesIpd />)
    }).not.toThrow()
  })
})
