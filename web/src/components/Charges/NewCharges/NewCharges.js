import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ChargesForm from 'src/components/Charges/ChargesForm'

const CREATE_CHARGES_MUTATION = gql`
  mutation CreateChargesMutation($input: CreateChargesInput!) {
    createCharges(input: $input) {
      id
    }
  }
`

const NewCharges = () => {
  const [createCharges, { loading, error }] = useMutation(
    CREATE_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('Charges created')
        navigate(routes.chargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCharges({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Charges</h2>
      </header>
      <div className="rw-segment-main">
        <ChargesForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCharges
