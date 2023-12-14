import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_COMPLAINTS_MUTATION = gql`
  mutation DeleteComplaintsMutation($id: Int!) {
    deleteComplaints(id: $id) {
      id
    }
  }
`

const Complaints = ({ complaints }) => {
  const [deleteComplaints] = useMutation(DELETE_COMPLAINTS_MUTATION, {
    onCompleted: () => {
      toast.success('Complaints deleted')
      navigate(routes.complaintses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete complaints ' + id + '?')) {
      deleteComplaints({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Complaints {complaints.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{complaints.id}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{complaints.note}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(complaints.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(complaints.updated_at)}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{complaints.ipdId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editComplaints({ id: complaints.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(complaints.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Complaints
