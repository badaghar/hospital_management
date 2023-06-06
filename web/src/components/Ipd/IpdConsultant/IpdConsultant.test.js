import { render } from '@redwoodjs/testing/web'

import IpdConsultant from './IpdConsultant'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpdConsultant', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpdConsultant />)
    }).not.toThrow()
  })
})
