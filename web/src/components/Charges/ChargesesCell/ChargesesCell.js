import { Link, routes } from '@redwoodjs/router'

import Chargeses from 'src/components/Charges/Chargeses'

export const QUERY = gql`
  query FindChargeses {
    chargeses {
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
      {'No chargeses yet. '}
      <Link to={routes.newCharges()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ chargeses }) => {
  return <Chargeses chargeses={chargeses} />
}
