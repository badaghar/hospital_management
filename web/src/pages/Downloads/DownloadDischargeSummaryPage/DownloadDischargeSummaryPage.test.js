import { render } from '@redwoodjs/testing/web'

import DownloadDischargeSummaryPage from './DownloadDischargeSummaryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadDischargeSummaryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadDischargeSummaryPage />)
    }).not.toThrow()
  })
})
