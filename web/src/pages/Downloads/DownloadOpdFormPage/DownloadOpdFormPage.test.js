import { render } from '@redwoodjs/testing/web'

import DownloadOpdFormPage from './DownloadOpdFormPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadOpdFormPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadOpdFormPage />)
    }).not.toThrow()
  })
})
