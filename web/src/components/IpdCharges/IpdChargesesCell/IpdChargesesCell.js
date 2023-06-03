import { Link, routes } from '@redwoodjs/router'

import IpdChargeses from 'src/components/IpdCharges/IpdChargeses'

export const QUERY = gql`
  query FindIpdChargeses {
    ipdChargeses {
      id
      charge_type
      charge
      quantity
      total
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
      {'No ipdChargeses yet. '}
      <Link to={routes.newIpdCharges()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdChargeses }) => {
  return <IpdChargeses ipdChargeses={ipdChargeses} />
}
