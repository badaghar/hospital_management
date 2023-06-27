import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdLabChargesForm from 'src/components/IpdLabCharges/IpdLabChargesForm'

export const QUERY = gql`
  query EditIpdLabChargesById($id: Int!) {
    ipdLabCharges: ipdLabCharges(id: $id) {
      id
      lab_name
      ipdId
      amount
      created_at
      updated_at
    }
  }
`
const UPDATE_IPD_LAB_CHARGES_MUTATION = gql`
  mutation UpdateIpdLabChargesMutation(
    $id: Int!
    $input: UpdateIpdLabChargesInput!
  ) {
    updateIpdLabCharges(id: $id, input: $input) {
      id
      lab_name
      ipdId
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

export const Success = ({ ipdLabCharges }) => {
  const [updateIpdLabCharges, { loading, error }] = useMutation(
    UPDATE_IPD_LAB_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdLabCharges updated')
        navigate(routes.ipdLabChargeses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdLabCharges({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdLabCharges {ipdLabCharges?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdLabChargesForm
          ipdLabCharges={ipdLabCharges}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
