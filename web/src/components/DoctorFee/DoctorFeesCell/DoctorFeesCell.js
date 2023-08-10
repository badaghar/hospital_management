import { Link, routes } from '@redwoodjs/router'

import DoctorFees from 'src/components/DoctorFee/DoctorFees'

export const QUERY = gql`
  query FindDoctorFees {
    doctorFees {
      id
      type
      amount
      userId
      did{
        name
      }
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No doctorFees yet. '}
      <Link to={routes.newDoctorFee()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ doctorFees }) => {
  return <DoctorFees doctorFees={doctorFees} />
}
