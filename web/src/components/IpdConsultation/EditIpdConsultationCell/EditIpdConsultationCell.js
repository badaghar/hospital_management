import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdConsultationForm from 'src/components/IpdConsultation/IpdConsultationForm'

export const QUERY = gql`
  query EditIpdConsultationById($id: Int!) {
    ipdConsultation: ipdConsultation(id: $id) {
      id
      consultation_doctor
      consultation_type
      amount
      ipdId
      created_at
      updated_at
    }
  }
`
const UPDATE_IPD_CONSULTATION_MUTATION = gql`
  mutation UpdateIpdConsultationMutation(
    $id: Int!
    $input: UpdateIpdConsultationInput!
  ) {
    updateIpdConsultation(id: $id, input: $input) {
      id
      consultation_doctor
      consultation_type
      amount
      ipdId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdConsultation }) => {
  const [updateIpdConsultation, { loading, error }] = useMutation(
    UPDATE_IPD_CONSULTATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdConsultation updated')
        navigate(routes.ipdConsultations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdConsultation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdConsultation {ipdConsultation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdConsultationForm
          ipdConsultation={ipdConsultation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
