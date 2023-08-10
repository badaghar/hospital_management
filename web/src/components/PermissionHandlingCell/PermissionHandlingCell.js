import { useState } from "react"
import PharmacyReportHeaderCell from "../PharmacyReport/PharmacyReportHeaderCell"
import PermissionHandling from "../PermissionHandling/PermissionHandling"

export const QUERY = gql`
  query FindPermissionHandlingQuery {
    users {
      id
      name
      email
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
      roles
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }) => {
  const [changeId, setChangeId] = useState(0)
  return (

    <>
      <div>
        <div className='p-10 text-white'>
          <div >

            <PharmacyReportHeaderCell id={22} changeId={setChangeId} users={users} />
          </div>
        </div>


        <div>
          <PermissionHandling users={users} />
        </div>



      </div>
    </>
  )
}
