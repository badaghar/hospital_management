import { render } from '@redwoodjs/testing/web'

import OpdPrescriptionPage from './OpdPrescriptionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OpdPrescriptionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpdPrescriptionPage />)
    }).not.toThrow()
  })
})
