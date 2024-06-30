import { render } from '@redwoodjs/testing/web'

import QrcodePage from './QrcodePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('QrcodePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<QrcodePage />)
    }).not.toThrow()
  })
})
