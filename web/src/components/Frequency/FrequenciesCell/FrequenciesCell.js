import { Link, routes } from '@redwoodjs/router'

import Frequencies from 'src/components/Frequency/Frequencies'

export const QUERY = gql`
  query FindFrequencies {
    frequencies {
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
      {'No frequencies yet. '}
      <Link to={routes.newFrequency()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ frequencies }) => {
  return <Frequencies frequencies={frequencies} />
}
