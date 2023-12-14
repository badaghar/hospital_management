import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ComplaintsForm from 'src/components/Complaints/ComplaintsForm'

const CREATE_COMPLAINTS_MUTATION = gql`
  mutation CreateComplaintsMutation($input: CreateComplaintsInput!) {
    createComplaints(input: $input) {
      id
    }
  }
`

const NewComplaints = () => {
  const [createComplaints, { loading, error }] = useMutation(
    CREATE_COMPLAINTS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Complaints created')
        navigate(routes.complaintses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createComplaints({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Complaints</h2>
      </header>
      <div className="rw-segment-main">
        <ComplaintsForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewComplaints
