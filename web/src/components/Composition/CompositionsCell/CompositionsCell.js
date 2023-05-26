import { Link, routes } from '@redwoodjs/router'

import Compositions from 'src/components/Composition/Compositions'

export const QUERY = gql`
  query FindCompositions {
    compositions {
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
      {'No compositions yet. '}
      <Link to={routes.newComposition()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ compositions }) => {
  return <Compositions compositions={compositions} />
}
