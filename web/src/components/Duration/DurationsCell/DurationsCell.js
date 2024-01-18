import { Link, routes } from '@redwoodjs/router'

import Durations from 'src/components/Duration/Durations'

export const QUERY = gql`
  query FindDurations {
    durations {
      id
      name
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
      {'No durations yet. '}
      <Link to={routes.newDuration()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ durations }) => {
  return <Durations durations={durations} />
}
