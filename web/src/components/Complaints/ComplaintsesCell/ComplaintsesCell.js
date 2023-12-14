import { Link, routes } from '@redwoodjs/router'

import Complaintses from 'src/components/Complaints/Complaintses'

export const QUERY = gql`
  query FindComplaintses {
    complaintses {
      id
      note
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No complaintses yet. '}
      <Link to={routes.newComplaints()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ complaintses }) => {
  return <Complaintses complaintses={complaintses} />
}
