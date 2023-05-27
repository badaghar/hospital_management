import { render } from '@redwoodjs/testing/web'

import DownloadSaleMedicine from './DownloadSaleMedicine'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DownloadSaleMedicine', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadSaleMedicine />)
    }).not.toThrow()
  })
})
