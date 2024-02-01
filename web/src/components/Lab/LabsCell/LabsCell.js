import { Link, routes } from '@redwoodjs/router'

import Labs from 'src/components/Lab/Labs'

export const QUERY = gql`
  query FindLabs {
    labs {
      id
      name
      phone_no
      Address
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
      {'No labs yet. '}
      <Link to={routes.newLab()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ labs }) => {
  return <Labs labs={labs} />
}
