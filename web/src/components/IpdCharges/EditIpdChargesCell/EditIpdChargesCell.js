import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdChargesForm from 'src/components/IpdCharges/IpdChargesForm'

export const QUERY = gql`
  query EditIpdChargesById($id: Int!) {
    ipdCharges: ipdCharges(id: $id) {
      id
      charge_type
      charge
      quantity
      total
      created_at
      updated_at
      ipdId
    }
  }
`
const UPDATE_IPD_CHARGES_MUTATION = gql`
  mutation UpdateIpdChargesMutation($id: Int!, $input: UpdateIpdChargesInput!) {
    updateIpdCharges(id: $id, input: $input) {
      id
      charge_type
      charge
      quantity
      total
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

export const Success = ({ ipdCharges }) => {
  const [updateIpdCharges, { loading, error }] = useMutation(
    UPDATE_IPD_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdCharges updated')
        navigate(routes.ipdChargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdCharges({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdCharges {ipdCharges?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdChargesForm
          ipdCharges={ipdCharges}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
