import { Link, routes } from '@redwoodjs/router'

import Ipds from 'src/components/Ipd/Ipds'

export const QUERY = gql`
  query FindIpds($type: String!) {
    ipds(type: $type) {
      id
      consultant_doctor
      date_of_admission
      discharge_date
      created_at
      updated_at
      paid_amount
      patientId
      patient{
        name
        phone_no
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({type}) => {
  return (
    <div className="rw-text-center">
      {'No ipds yet. '}
      <Link to={routes.newIpd({type})} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipds,type }) => {
  return <Ipds ipds={ipds} />
}
