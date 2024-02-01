import { Link, routes } from '@redwoodjs/router'

import IpdInvestigations from 'src/components/IpdInvestigation/IpdInvestigations'

export const QUERY = gql`
  query FindIpdInvestigations {
    ipdInvestigations {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdInvestigations yet. '}
      <Link to={routes.newIpdInvestigation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdInvestigations }) => {
  return <IpdInvestigations ipdInvestigations={ipdInvestigations} />
}
