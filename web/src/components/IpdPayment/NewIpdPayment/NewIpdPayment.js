import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdPaymentForm from 'src/components/IpdPayment/IpdPaymentForm'

const CREATE_IPD_PAYMENT_MUTATION = gql`
  mutation CreateIpdPaymentMutation($input: CreateIpdPaymentInput!) {
    createIpdPayment(input: $input) {
      id
    }
  }
`

const NewIpdPayment = () => {
  const [createIpdPayment, { loading, error }] = useMutation(
    CREATE_IPD_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPayment created')
        navigate(routes.ipdPayments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdPayment({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdPayment</h2>
      </header>
      <div className="rw-segment-main">
        <IpdPaymentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdPayment
