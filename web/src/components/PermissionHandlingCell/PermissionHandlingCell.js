import { useLayoutEffect, useState } from "react"
import PharmacyReportHeaderCell from "../PharmacyReport/PharmacyReportHeaderCell"
import PermissionHandling from "../PermissionHandling/PermissionHandling"

export const QUERY = gql`
  query FindPermissionHandlingQuery {
    users {
      id
      name
      email
      permissions
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
  const [user,setUser] = useState([])

  console.log(changeId)/////s
  useLayoutEffect(()=>{
    const u = users.filter((ele)=>ele.roles!=='admin')
    setUser(u)
  },[])


  return (

    <>
      <div>
        <div className='p-10 text-white'>
          <div >

            <PharmacyReportHeaderCell id={32} changeId={setChangeId} users={user} />
          </div>
        </div>


        <div>
        {  changeId!=0 &&
          <PermissionHandling users={users} id={changeId} />}
        </div>



      </div>
    </>
  )
}
