import { Link, routes } from '@redwoodjs/router'

import Ipds from 'src/components/Ipd/Ipds'

export const QUERY = gql`
  query FindIpds {
    ipds {
      id
      consultant_doctor
      date_of_admission
      created_at
      updated_at
      paid_amount
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipds yet. '}
      <Link to={routes.newIpd()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipds }) => {
  return <Ipds ipds={ipds} />
}
