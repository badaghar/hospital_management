import { Link, routes } from '@redwoodjs/router'

import Patients from 'src/components/Patient/Patients'

export const QUERY = gql`
  query FindPatients {
    patients {
      id
      name
      age
      phone_no
      gender
      address
      doctorFeeId
      date_of_admission
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No patients yet. '}
      <Link to={routes.newPatient()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ patients }) => {
  return <Patients patients={patients} />
}
