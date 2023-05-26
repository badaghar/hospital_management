import { Link, routes } from '@redwoodjs/router'

import Manufacturers from 'src/components/Manufacturer/Manufacturers'

export const QUERY = gql`
  query FindManufacturers {
    manufacturers {
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
      {'No manufacturers yet. '}
      <Link to={routes.newManufacturer()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ manufacturers }) => {
  return <Manufacturers manufacturers={manufacturers} />
}
