import { Link, routes } from '@redwoodjs/router'

import Dossages from 'src/components/Dossage/Dossages'

export const QUERY = gql`
  query FindDossages {
    dossages {
      id
      dose
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
      {'No dossages yet. '}
      <Link to={routes.newDossage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ dossages }) => {
  return <Dossages dossages={dossages} />
}
