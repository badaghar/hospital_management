import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LabChargesForm from 'src/components/LabCharges/LabChargesForm'

export const QUERY = gql`
  query EditLabChargesById($id: Int!) {
    labCharges: labCharges(id: $id) {
      id
      name
      amount
      created_at
      updated_at
    }
  }
`
const UPDATE_LAB_CHARGES_MUTATION = gql`
  mutation UpdateLabChargesMutation($id: Int!, $input: UpdateLabChargesInput!) {
    updateLabCharges(id: $id, input: $input) {
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

export const Success = ({ labCharges }) => {
  const [updateLabCharges, { loading, error }] = useMutation(
    UPDATE_LAB_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('LabCharges updated')
        navigate(routes.labChargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateLabCharges({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit LabCharges {labCharges?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <LabChargesForm
          labCharges={labCharges}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
