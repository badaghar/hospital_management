import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdOperationPaymentForm from 'src/components/IpdOperationPayment/IpdOperationPaymentForm'

export const QUERY = gql`
  query EditIpdOperationPaymentById($id: Int!) {
    ipdOperationPayment: ipdOperationPayment(id: $id) {
      id
      operation_name
      amount
      created_at
      updated_at
      ipdId
    }
  }
`
const UPDATE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation UpdateIpdOperationPaymentMutation(
    $id: Int!
    $input: UpdateIpdOperationPaymentInput!
  ) {
    updateIpdOperationPayment(id: $id, input: $input) {
      id
      operation_name
      amount
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdOperationPayment }) => {
  const [updateIpdOperationPayment, { loading, error }] = useMutation(
    UPDATE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment updated')
        navigate(routes.ipdOperationPayments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdOperationPayment({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdOperationPayment {ipdOperationPayment?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdOperationPaymentForm
          ipdOperationPayment={ipdOperationPayment}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
