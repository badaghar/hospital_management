import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PermissionHandling from 'src/components/PermissionHandling/PermissionHandling'
import PermissionHandlingCell from 'src/components/PermissionHandlingCell'

const UserRolesPage = () => {
  return (
    <>
      <MetaTags title="UserRoles" description="UserRoles page" />

      <PermissionHandlingCell  />
    </>
  )
}

export default UserRolesPage
