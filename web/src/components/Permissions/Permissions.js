
import { useLayoutEffect } from "react"
import { useAuth } from "src/auth"

const Permissions = ({ obj }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const headers = ['pharmacy', 'pharmacy report', 'patient', 'charges']
  useLayoutEffect(() => {
    if (
      currentUser.permissions[headers[0]] in obj ||
      currentUser.permissions[headers[1]] in obj ||
      currentUser.permissions[headers[2]] in obj ||
      currentUser.permissions[headers[3]] in obj



    ) {

    }
    else {
      <Redirect to={routes.home()} />
    }

  })


  return (
    <>

    </>
  )
}

export default Permissions
