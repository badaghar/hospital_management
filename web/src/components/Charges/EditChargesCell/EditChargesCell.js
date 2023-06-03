import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ChargesForm from 'src/components/Charges/ChargesForm'

export const QUERY = gql`
  query EditChargesById($id: Int!) {
    charges: charges(id: $id) {
      id
      name
      amount
      created_at
      updated_at
    }
  }
`
const UPDATE_CHARGES_MUTATION = gql`
  mutation UpdateChargesMutation($id: Int!, $input: UpdateChargesInput!) {
    updateCharges(id: $id, input: $input) {
      id
      name
      amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ charges }) => {
  const [updateCharges, { loading, error }] = useMutation(
    UPDATE_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('Charges updated')
        navigate(routes.chargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCharges({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Charges {charges?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ChargesForm
          charges={charges}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
