import { Link, routes } from '@redwoodjs/router'

import IpdPayments from 'src/components/IpdPayment/IpdPayments'

export const QUERY = gql`
  query FindIpdPayments {
    ipdPayments {
      id
      amount
      payment_mode
      ipdId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdPayments yet. '}
      <Link to={routes.newIpdPayment()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdPayments }) => {
  return <IpdPayments ipdPayments={ipdPayments} />
}
