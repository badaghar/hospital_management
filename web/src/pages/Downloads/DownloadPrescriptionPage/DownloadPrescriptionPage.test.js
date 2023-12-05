import { render } from '@redwoodjs/testing/web'

import DownloadPrescriptionPage from './DownloadPrescriptionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadPrescriptionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadPrescriptionPage />)
    }).not.toThrow()
  })
})
