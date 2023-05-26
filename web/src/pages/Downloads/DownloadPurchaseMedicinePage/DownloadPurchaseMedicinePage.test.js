import { render } from '@redwoodjs/testing/web'

import DownloadPurchaseMedicinePage from './DownloadPurchaseMedicinePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadPurchaseMedicinePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadPurchaseMedicinePage />)
    }).not.toThrow()
  })
})
