import { render } from '@redwoodjs/testing/web'

import PermissionHandling from './PermissionHandling'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PermissionHandling', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PermissionHandling />)
    }).not.toThrow()
  })
})
