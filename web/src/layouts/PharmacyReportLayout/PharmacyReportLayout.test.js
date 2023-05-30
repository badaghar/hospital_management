import { render } from '@redwoodjs/testing/web'

import PharmacyReportLayout from './PharmacyReportLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PharmacyReportLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PharmacyReportLayout />)
    }).not.toThrow()
  })
})
