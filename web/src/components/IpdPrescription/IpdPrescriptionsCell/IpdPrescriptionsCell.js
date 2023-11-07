import { Link, routes } from '@redwoodjs/router'

import IpdPrescriptions from 'src/components/IpdPrescription/IpdPrescriptions'

export const QUERY = gql`
  query FindIpdPrescriptions {
    ipdPrescriptions {
      id
      ipdId
      medicine
      dosage
      timing
      frequency
      duration
      note
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdPrescriptions yet. '}
      <Link to={routes.newIpdPrescription()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdPrescriptions }) => {
  return <IpdPrescriptions ipdPrescriptions={ipdPrescriptions} />
}
