import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Distributer/DistributersCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_DISTRIBUTER_MUTATION = gql`
  mutation DeleteDistributerMutation($id: Int!) {
    deleteDistributer(id: $id) {
      id
    }
  }
`

const DistributersList = ({ distributers }) => {
  const [deleteDistributer] = useMutation(DELETE_DISTRIBUTER_MUTATION, {
    onCompleted: () => {
      toast.success('Distributer deleted')
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
    if (confirm('Are you sure you want to delete distributer ' + id + '?')) {
      deleteDistributer({ variables: { id } })
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
            <th>Gst no</th>
            <th>Dl no</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {distributers.map((distributer) => (
            <tr key={distributer.id}>
              <td>{truncate(distributer.id)}</td>
              <td>{truncate(distributer.name)}</td>
              <td>{truncate(distributer.phoneNo)}</td>
              <td>{truncate(distributer.gstNo)}</td>
              <td>{truncate(distributer.dlNo)}</td>
              <td>{timeTag(distributer.created_at)}</td>
              <td>{timeTag(distributer.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.distributer({ id: distributer.id })}
                    title={'Show distributer ' + distributer.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDistributer({ id: distributer.id })}
                    title={'Edit distributer ' + distributer.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete distributer ' + distributer.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(distributer.id)}
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

export default DistributersList
