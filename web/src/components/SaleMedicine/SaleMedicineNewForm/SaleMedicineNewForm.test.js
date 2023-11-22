import { render } from '@redwoodjs/testing/web'

import SaleMedicineNewForm from './SaleMedicineNewForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SaleMedicineNewForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SaleMedicineNewForm />)
    }).not.toThrow()
  })
})
