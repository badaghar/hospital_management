import { render } from '@redwoodjs/testing/web'

import DownloadLabChargesPage from './DownloadLabChargesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadLabChargesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadLabChargesPage />)
    }).not.toThrow()
  })
})
