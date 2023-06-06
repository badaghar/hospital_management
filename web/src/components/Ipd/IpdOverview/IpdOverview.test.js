import { render } from '@redwoodjs/testing/web'

import IpdOverview from './IpdOverview'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IpdOverview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IpdOverview />)
    }).not.toThrow()
  })
})
