import { render } from '@redwoodjs/testing/web'

import UserRolesPage from './UserRolesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserRolesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserRolesPage />)
    }).not.toThrow()
  })
})
