import { render } from '@redwoodjs/testing/web'

import Doucuments from './Doucuments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Doucuments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Doucuments />)
    }).not.toThrow()
  })
})
