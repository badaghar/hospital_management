import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdInvestigationForm from 'src/components/IpdInvestigation/IpdInvestigationForm'

export const QUERY = gql`
  query EditIpdInvestigationById($id: Int!) {
    ipdInvestigation: ipdInvestigation(id: $id) {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
    }
  }
`
const UPDATE_IPD_INVESTIGATION_MUTATION = gql`
  mutation UpdateIpdInvestigationMutation(
    $id: Int!
    $input: UpdateIpdInvestigationInput!
  ) {
    updateIpdInvestigation(id: $id, input: $input) {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdInvestigation }) => {
  const [updateIpdInvestigation, { loading, error }] = useMutation(
    UPDATE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdInvestigation updated')
        navigate(routes.ipdInvestigations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdInvestigation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit IpdInvestigation {ipdInvestigation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IpdInvestigationForm
          ipdInvestigation={ipdInvestigation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
