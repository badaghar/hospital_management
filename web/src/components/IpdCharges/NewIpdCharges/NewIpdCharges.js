import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdChargesForm from 'src/components/IpdCharges/IpdChargesForm'

const CREATE_IPD_CHARGES_MUTATION = gql`
  mutation CreateIpdChargesMutation($input: CreateIpdChargesInput!) {
    createIpdCharges(input: $input) {
      id
    }
  }
`

const NewIpdCharges = () => {
  const [createIpdCharges, { loading, error }] = useMutation(
    CREATE_IPD_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdCharges created')
        navigate(routes.ipdChargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdCharges({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdCharges</h2>
      </header>
      <div className="rw-segment-main">
        <IpdChargesForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdCharges
