import { render } from '@redwoodjs/testing/web'

import ExportMedicneStoreReport from './ExportMedicneStoreReport'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExportMedicneStoreReport', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExportMedicneStoreReport />)
    }).not.toThrow()
  })
})
