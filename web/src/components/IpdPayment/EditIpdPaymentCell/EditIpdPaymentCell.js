import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdPaymentForm from 'src/components/IpdPayment/IpdPaymentForm'

export const QUERY = gql`
  query EditIpdPaymentById($id: Int!) {
    ipdPayment: ipdPayment(id: $id) {
      id
      amount
      payment_mode
      ipdId
      created_at
      updated_at
    }
  }
`
const UPDATE_IPD_PAYMENT_MUTATION = gql`
  mutation UpdateIpdPaymentMutation($id: Int!, $input: UpdateIpdPaymentInput!) {
    updateIpdPayment(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdPayment }) => {
  const [updateIpdPayment, { loading, error }] = useMutation(
    UPDATE_IPD_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPayment updated')
        navigate(routes.ipdPayments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdPayment({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdPayment {ipdPayment?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdPaymentForm
          ipdPayment={ipdPayment}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
