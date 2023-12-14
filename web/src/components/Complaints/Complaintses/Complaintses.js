import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Complaints/ComplaintsesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_COMPLAINTS_MUTATION = gql`
  mutation DeleteComplaintsMutation($id: Int!) {
    deleteComplaints(id: $id) {
      id
    }
  }
`

const ComplaintsesList = ({ complaintses }) => {
  const [deleteComplaints] = useMutation(DELETE_COMPLAINTS_MUTATION, {
    onCompleted: () => {
      toast.success('Complaints deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete complaints ' + id + '?')) {
      deleteComplaints({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Note</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Ipd id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {complaintses.map((complaints) => (
            <tr key={complaints.id}>
              <td>{truncate(complaints.id)}</td>
              <td>{truncate(complaints.note)}</td>
              <td>{timeTag(complaints.created_at)}</td>
              <td>{timeTag(complaints.updated_at)}</td>
              <td>{truncate(complaints.ipdId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.complaints({ id: complaints.id })}
                    title={'Show complaints ' + complaints.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editComplaints({ id: complaints.id })}
                    title={'Edit complaints ' + complaints.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete complaints ' + complaints.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(complaints.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComplaintsesList
