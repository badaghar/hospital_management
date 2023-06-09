import { render } from '@redwoodjs/testing/web'

import NewReturnMedicineTable from './NewReturnMedicineTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewReturnMedicineTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewReturnMedicineTable />)
    }).not.toThrow()
  })
})
