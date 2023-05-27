import { render } from '@redwoodjs/testing/web'

import SaleMedicineSkeleton from './SaleMedicineSkeleton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SaleMedicineSkeleton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SaleMedicineSkeleton />)
    }).not.toThrow()
  })
})
