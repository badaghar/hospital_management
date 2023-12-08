import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdHomoPrescriptionForm from 'src/components/IpdHomoPrescription/IpdHomoPrescriptionForm'

export const QUERY = gql`
  query EditIpdHomoPrescriptionById($id: Int!) {
    ipdHomoPrescription: ipdHomoPrescription(id: $id) {
      id
      ipdId
      medicine
      dosage
      timing
      frequency
      duration
      note
      rate
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_IPD_HOMO_PRESCRIPTION_MUTATION = gql`
  mutation UpdateIpdHomoPrescriptionMutation(
    $id: Int!
    $input: UpdateIpdHomoPrescriptionInput!
  ) {
    updateIpdHomoPrescription(id: $id, input: $input) {
      id
      ipdId
      medicine
      dosage
      timing
      frequency
      duration
      note
      rate
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdHomoPrescription }) => {
  const [updateIpdHomoPrescription, { loading, error }] = useMutation(
    UPDATE_IPD_HOMO_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdHomoPrescription updated')
        navigate(routes.ipdHomoPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdHomoPrescription({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdHomoPrescription {ipdHomoPrescription?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdHomoPrescriptionForm
          ipdHomoPrescription={ipdHomoPrescription}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
