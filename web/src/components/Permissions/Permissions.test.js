import { render } from '@redwoodjs/testing/web'

import Permissions from './Permissions'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Permissions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Permissions />)
    }).not.toThrow()
  })
})
