import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Composition/CompositionsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_COMPOSITION_MUTATION = gql`
  mutation DeleteCompositionMutation($id: Int!) {
    deleteComposition(id: $id) {
      id
    }
  }
`

const CompositionsList = ({ compositions }) => {
  const [deleteComposition] = useMutation(DELETE_COMPOSITION_MUTATION, {
    onCompleted: () => {
      toast.success('Composition deleted')
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
    if (confirm('Are you sure you want to delete composition ' + id + '?')) {
      deleteComposition({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {compositions.map((composition) => (
            <tr key={composition.id}>
              <td>{truncate(composition.id)}</td>
              <td>{truncate(composition.name)}</td>
              <td>{timeTag(composition.created_at)}</td>
              <td>{timeTag(composition.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.composition({ id: composition.id })}
                    title={'Show composition ' + composition.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editComposition({ id: composition.id })}
                    title={'Edit composition ' + composition.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  {/* <button
                    type="button"
                    title={'Delete composition ' + composition.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(composition.id)}
                  >
                    Delete
                  </button> */}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompositionsList
