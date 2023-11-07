import { render } from '@redwoodjs/testing/web'

import Prescription from './Prescription'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Prescription', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Prescription />)
    }).not.toThrow()
  })
})
