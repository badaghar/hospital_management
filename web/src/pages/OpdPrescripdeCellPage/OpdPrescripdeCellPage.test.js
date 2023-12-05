import { render } from '@redwoodjs/testing/web'

import OpdPrescripdeCellPage from './OpdPrescripdeCellPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OpdPrescripdeCellPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpdPrescripdeCellPage />)
    }).not.toThrow()
  })
})
