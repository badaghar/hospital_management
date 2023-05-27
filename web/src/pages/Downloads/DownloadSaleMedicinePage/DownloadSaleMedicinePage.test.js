import { render } from '@redwoodjs/testing/web'

import DownloadSaleMedicinePage from './DownloadSaleMedicinePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadSaleMedicinePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadSaleMedicinePage />)
    }).not.toThrow()
  })
})
