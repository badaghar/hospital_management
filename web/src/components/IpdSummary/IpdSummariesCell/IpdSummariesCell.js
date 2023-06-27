import { Link, routes } from '@redwoodjs/router'

import IpdSummaries from 'src/components/IpdSummary/IpdSummaries'

export const QUERY = gql`
  query FindIpdSummaries {
    ipdSummaries {
      id
      created_at
      ipdId
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdSummaries yet. '}
      <Link to={routes.newIpdSummary()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdSummaries }) => {
  return <IpdSummaries ipdSummaries={ipdSummaries} />
}
