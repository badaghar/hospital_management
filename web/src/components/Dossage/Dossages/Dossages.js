import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Dossage/DossagesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_DOSSAGE_MUTATION = gql`
  mutation DeleteDossageMutation($id: Int!) {
    deleteDossage(id: $id) {
      id
    }
  }
`

const DossagesList = ({ dossages }) => {
  const [deleteDossage] = useMutation(DELETE_DOSSAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Dossage deleted')
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
    if (confirm('Are you sure you want to delete dossage ' + id + '?')) {
      deleteDossage({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Dose</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {dossages.map((dossage) => (
            <tr key={dossage.id}>
              <td>{truncate(dossage.id)}</td>
              <td>{truncate(dossage.dose)}</td>
              <td>{timeTag(dossage.created_at)}</td>
              <td>{timeTag(dossage.updated_at)}</td>
              <td>{jsonTruncate(dossage.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.dossage({ id: dossage.id })}
                    title={'Show dossage ' + dossage.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDossage({ id: dossage.id })}
                    title={'Edit dossage ' + dossage.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete dossage ' + dossage.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(dossage.id)}
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

export default DossagesList
