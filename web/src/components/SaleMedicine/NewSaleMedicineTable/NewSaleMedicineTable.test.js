import { render } from '@redwoodjs/testing/web'

import NewSaleMedicineTable from './NewSaleMedicineTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewSaleMedicineTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewSaleMedicineTable />)
    }).not.toThrow()
  })
})
