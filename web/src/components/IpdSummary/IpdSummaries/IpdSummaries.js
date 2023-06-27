import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdSummary/IpdSummariesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_SUMMARY_MUTATION = gql`
  mutation DeleteIpdSummaryMutation($id: Int!) {
    deleteIpdSummary(id: $id) {
      id
    }
  }
`

const IpdSummariesList = ({ ipdSummaries }) => {
  const [deleteIpdSummary] = useMutation(DELETE_IPD_SUMMARY_MUTATION, {
    onCompleted: () => {
      toast.success('IpdSummary deleted')
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
    if (confirm('Are you sure you want to delete ipdSummary ' + id + '?')) {
      deleteIpdSummary({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Ipd id</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdSummaries.map((ipdSummary) => (
            <tr key={ipdSummary.id}>
              <td>{truncate(ipdSummary.id)}</td>
              <td>{timeTag(ipdSummary.created_at)}</td>
              <td>{truncate(ipdSummary.ipdId)}</td>
              <td>{timeTag(ipdSummary.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdSummary({ id: ipdSummary.id })}
                    title={'Show ipdSummary ' + ipdSummary.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdSummary({ id: ipdSummary.id })}
                    title={'Edit ipdSummary ' + ipdSummary.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdSummary ' + ipdSummary.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdSummary.id)}
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

export default IpdSummariesList
