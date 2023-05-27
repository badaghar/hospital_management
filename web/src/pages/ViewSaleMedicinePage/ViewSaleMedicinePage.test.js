import { render } from '@redwoodjs/testing/web'

import ViewSaleMedicinePage from './ViewSaleMedicinePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewSaleMedicinePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewSaleMedicinePage />)
    }).not.toThrow()
  })
})
