import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ComplaintsForm from 'src/components/Complaints/ComplaintsForm'

export const QUERY = gql`
  query EditComplaintsById($id: Int!) {
    complaints: complaints(id: $id) {
      id
      note
      created_at
      updated_at
      ipdId
    }
  }
`
const UPDATE_COMPLAINTS_MUTATION = gql`
  mutation UpdateComplaintsMutation($id: Int!, $input: UpdateComplaintsInput!) {
    updateComplaints(id: $id, input: $input) {
      id
      note
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

export const Success = ({ complaints }) => {
  const [updateComplaints, { loading, error }] = useMutation(
    UPDATE_COMPLAINTS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Complaints updated')
        navigate(routes.complaintses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateComplaints({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Complaints {complaints?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ComplaintsForm
          complaints={complaints}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
