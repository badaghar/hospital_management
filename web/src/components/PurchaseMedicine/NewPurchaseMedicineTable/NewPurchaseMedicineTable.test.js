import { render } from '@redwoodjs/testing/web'

import NewPurchaseMedicineTable from './NewPurchaseMedicineTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewPurchaseMedicineTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewPurchaseMedicineTable />)
    }).not.toThrow()
  })
})
