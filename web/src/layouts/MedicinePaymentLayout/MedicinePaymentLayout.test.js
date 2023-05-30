import { render } from '@redwoodjs/testing/web'

import MedicinePaymentLayout from './MedicinePaymentLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MedicinePaymentLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MedicinePaymentLayout />)
    }).not.toThrow()
  })
})
