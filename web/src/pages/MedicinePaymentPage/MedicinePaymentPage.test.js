import { render } from '@redwoodjs/testing/web'

import MedicinePaymentPage from './MedicinePaymentPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MedicinePaymentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MedicinePaymentPage />)
    }).not.toThrow()
  })
})
