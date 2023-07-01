import { render } from '@redwoodjs/testing/web'

import SummaryIpd from './SummaryIpd'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SummaryIpd', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryIpd />)
    }).not.toThrow()
  })
})
