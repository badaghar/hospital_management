import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Operation/OperationsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_OPERATION_MUTATION = gql`
  mutation DeleteOperationMutation($id: Int!) {
    deleteOperation(id: $id) {
      id
    }
  }
`

const OperationsList = ({ operations }) => {
  const [deleteOperation] = useMutation(DELETE_OPERATION_MUTATION, {
    onCompleted: () => {
      toast.success('Operation deleted')
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
    if (confirm('Are you sure you want to delete operation ' + id + '?')) {
      deleteOperation({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Operation name</th>
            <th>Date</th>
            <th>Consultant doctor</th>
            <th>Remark</th>
            <th>Result</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Ipd id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <tr key={operation.id}>
              <td>{truncate(operation.id)}</td>
              <td>{truncate(operation.operation_name)}</td>
              <td>{timeTag(operation.date)}</td>
              <td>{truncate(operation.consultant_doctor)}</td>
              <td>{truncate(operation.remark)}</td>
              <td>{truncate(operation.result)}</td>
              <td>{timeTag(operation.created_at)}</td>
              <td>{timeTag(operation.updated_at)}</td>
              <td>{truncate(operation.ipdId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.operation({ id: operation.id })}
                    title={'Show operation ' + operation.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOperation({ id: operation.id })}
                    title={'Edit operation ' + operation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete operation ' + operation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(operation.id)}
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

export default OperationsList
