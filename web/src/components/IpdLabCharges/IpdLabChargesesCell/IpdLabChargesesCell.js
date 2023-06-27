import { Link, routes } from '@redwoodjs/router'

import IpdLabChargeses from 'src/components/IpdLabCharges/IpdLabChargeses'

export const QUERY = gql`
  query FindIpdLabChargeses {
    ipdLabChargeses {
      id
      lab_name
      ipdId
      amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdLabChargeses yet. '}
      <Link to={routes.newIpdLabCharges()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdLabChargeses }) => {
  return <IpdLabChargeses ipdLabChargeses={ipdLabChargeses} />
}
