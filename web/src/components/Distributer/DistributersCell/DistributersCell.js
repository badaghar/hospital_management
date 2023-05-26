import { Link, routes } from '@redwoodjs/router'

import Distributers from 'src/components/Distributer/Distributers'

export const QUERY = gql`
  query FindDistributers {
    distributers {
      id
      name
      phoneNo
      gstNo
      dlNo
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No distributers yet. '}
      <Link to={routes.newDistributer()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ distributers }) => {
  return <Distributers distributers={distributers} />
}
