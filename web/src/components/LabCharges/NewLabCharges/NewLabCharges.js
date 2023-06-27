import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LabChargesForm from 'src/components/LabCharges/LabChargesForm'

const CREATE_LAB_CHARGES_MUTATION = gql`
  mutation CreateLabChargesMutation($input: CreateLabChargesInput!) {
    createLabCharges(input: $input) {
      id
    }
  }
`

const NewLabCharges = () => {
  const [createLabCharges, { loading, error }] = useMutation(
    CREATE_LAB_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('LabCharges created')
        navigate(routes.labChargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createLabCharges({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New LabCharges</h2>
      </header>
      <div className="rw-segment-main">
        <LabChargesForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLabCharges
