import { Link, routes } from '@redwoodjs/router'

import IpdChats from 'src/components/IpdChat/IpdChats'

export const QUERY = gql`
  query FindIpdChats {
    ipdChats {
      id
      created_at
      ipdId
      date
      drug
      dose
      route
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdChats yet. '}
      <Link to={routes.newIpdChat()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdChats }) => {
  return <IpdChats ipdChats={ipdChats} />
}
