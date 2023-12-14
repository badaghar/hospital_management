import { render } from '@redwoodjs/testing/web'

import Complaint from './Complaint'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Complaint', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Complaint />)
    }).not.toThrow()
  })
})
