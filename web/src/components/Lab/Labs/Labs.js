import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Lab/LabsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_LAB_MUTATION = gql`
  mutation DeleteLabMutation($id: Int!) {
    deleteLab(id: $id) {
      id
    }
  }
`

const LabsList = ({ labs }) => {
  const [deleteLab] = useMutation(DELETE_LAB_MUTATION, {
    onCompleted: () => {
      toast.success('Lab deleted')
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
    if (confirm('Are you sure you want to delete lab ' + id + '?')) {
      deleteLab({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone no</th>
            <th>Address</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab) => (
            <tr key={lab.id}>
              <td>{truncate(lab.id)}</td>
              <td>{truncate(lab.name)}</td>
              <td>{truncate(lab.phone_no)}</td>
              <td>{truncate(lab.Address)}</td>
              <td>{timeTag(lab.created_at)}</td>
              <td>{timeTag(lab.updated_at)}</td>
              <td>{jsonTruncate(lab.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.lab({ id: lab.id })}
                    title={'Show lab ' + lab.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLab({ id: lab.id })}
                    title={'Edit lab ' + lab.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete lab ' + lab.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(lab.id)}
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

export default LabsList
