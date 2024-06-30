import { render } from '@redwoodjs/testing/web'

import SaleMedicineQrcode from './SaleMedicineQrcode'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SaleMedicineQrcode', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SaleMedicineQrcode />)
    }).not.toThrow()
  })
})
