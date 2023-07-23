import { render } from '@redwoodjs/testing/web'

import DownloadOtherChargesPage from './DownloadOtherChargesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadOtherChargesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadOtherChargesPage />)
    }).not.toThrow()
  })
})
