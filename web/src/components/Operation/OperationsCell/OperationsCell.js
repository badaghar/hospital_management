import { Link, routes } from '@redwoodjs/router'

import Operations from 'src/components/Operation/Operations'

export const QUERY = gql`
  query FindOperations {
    operations {
      id
      name
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No operations yet. '}
      <Link to={routes.newOperation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ operations }) => {
  return <Operations operations={operations} />
}
