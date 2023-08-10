import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const UserRolesPage = () => {
  return (
    <>
      <MetaTags title="UserRoles" description="UserRoles page" />

      <h1>UserRolesPage</h1>
      <p>
        Find me in <code>./web/src/pages/UserRolesPage/UserRolesPage.js</code>
      </p>
      <p>
        My default route is named <code>userRoles</code>, link to me with `
        <Link to={routes.userRoles()}>UserRoles</Link>`
      </p>
    </>
  )
}

export default UserRolesPage
