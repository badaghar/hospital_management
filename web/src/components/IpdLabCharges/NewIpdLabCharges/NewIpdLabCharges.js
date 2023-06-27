import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdLabChargesForm from 'src/components/IpdLabCharges/IpdLabChargesForm'

const CREATE_IPD_LAB_CHARGES_MUTATION = gql`
  mutation CreateIpdLabChargesMutation($input: CreateIpdLabChargesInput!) {
    createIpdLabCharges(input: $input) {
      id
    }
  }
`

const NewIpdLabCharges = () => {
  const [createIpdLabCharges, { loading, error }] = useMutation(
    CREATE_IPD_LAB_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdLabCharges created')
        navigate(routes.ipdLabChargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdLabCharges({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdLabCharges</h2>
      </header>
      <div className="rw-segment-main">
        <IpdLabChargesForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdLabCharges
