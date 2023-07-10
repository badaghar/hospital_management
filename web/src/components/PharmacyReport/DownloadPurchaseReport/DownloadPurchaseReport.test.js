import { render } from '@redwoodjs/testing/web'

import DownloadPurchaseReport from './DownloadPurchaseReport'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DownloadPurchaseReport', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadPurchaseReport />)
    }).not.toThrow()
  })
})
