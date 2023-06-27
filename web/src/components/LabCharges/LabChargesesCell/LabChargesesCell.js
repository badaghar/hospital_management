import { Link, routes } from '@redwoodjs/router'

import LabChargeses from 'src/components/LabCharges/LabChargeses'

export const QUERY = gql`
  query FindLabChargeses {
    labChargeses {
      id
      name
      amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No labChargeses yet. '}
      <Link to={routes.newLabCharges()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ labChargeses }) => {
  return <LabChargeses labChargeses={labChargeses} />
}
