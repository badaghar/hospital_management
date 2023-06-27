import { Link, routes } from '@redwoodjs/router'

import IpdOperationPayments from 'src/components/IpdOperationPayment/IpdOperationPayments'

export const QUERY = gql`
  query FindIpdOperationPayments {
    ipdOperationPayments {
      id
      operation_name
      date
      operation_doctor
      remark
      result
      amount
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdOperationPayments yet. '}
      <Link to={routes.newIpdOperationPayment()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdOperationPayments }) => {
  return <IpdOperationPayments ipdOperationPayments={ipdOperationPayments} />
}
