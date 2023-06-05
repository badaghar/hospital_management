import { Link, routes } from '@redwoodjs/router'

import Beds from 'src/components/Bed/Beds'

export const QUERY = gql`
  query FindBeds {
    beds {
      id
      bed_name
      occupied
      created_at
      updated_at
      floorId
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No beds yet. '}
      <Link to={routes.newBed()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ beds }) => {
  return <Beds beds={beds} />
}
