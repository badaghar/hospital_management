import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdOperationPaymentForm from 'src/components/IpdOperationPayment/IpdOperationPaymentForm'


export const QUERY = gql`
  query NewIpdOperationPaymentsQuery {
    ipds(type: "IPD") {
      id
      patient{
        name
      }
    }
    operations{
      name
    }
  }
`

const CREATE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation CreateIpdOperationPaymentMutation(
    $input: [CreateIpdOperationPaymentInput]!
  ) {
    createIpdOperationPayment(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ ipds,operations }) => {
  console.log(operations)
  const [createIpdOperationPayment, { loading, error }] = useMutation(
    CREATE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment created')
        navigate(routes.ipdOperationPayments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    input = [input]
    console.log(input)
    createIpdOperationPayment({ variables: { input } })
  }
  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New IpdOperationPayment
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdOperationPaymentForm
          onSave={onSave}
          loading={loading}
          error={error}
          ipds={ipds}
          operations={operations}
        />
      </div>
    </div>
  )
}
