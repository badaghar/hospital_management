import { render } from '@redwoodjs/testing/web'

import NewExpiryMedicineTable from './NewExpiryMedicineTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewExpiryMedicineTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewExpiryMedicineTable />)
    }).not.toThrow()
  })
})
