import { render } from '@redwoodjs/testing/web'

import DownloadSaleReport from './DownloadSaleReport'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DownloadSaleReport', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadSaleReport />)
    }).not.toThrow()
  })
})
