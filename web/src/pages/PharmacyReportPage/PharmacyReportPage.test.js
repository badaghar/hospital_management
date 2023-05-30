import { render } from '@redwoodjs/testing/web'

import PharmacyReportPage from './PharmacyReportPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PharmacyReportPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PharmacyReportPage />)
    }).not.toThrow()
  })
})
