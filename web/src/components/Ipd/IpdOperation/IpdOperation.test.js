import { render } from '@redwoodjs/testing/web'

import IpdOperation from './IpdOperation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpdOperation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpdOperation />)
    }).not.toThrow()
  })
})
