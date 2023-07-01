import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_IPD_SUMMARY_MUTATION = gql`
  mutation DeleteIpdSummaryMutation($id: Int!) {
    deleteIpdSummary(id: $id) {
      id
    }
  }
`

const IpdSummary = ({ ipdSummary }) => {
  const [deleteIpdSummary] = useMutation(DELETE_IPD_SUMMARY_MUTATION, {
    onCompleted: () => {
      toast.success('IpdSummary deleted')
      navigate(routes.ipdSummaries())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdSummary ' + id + '?')) {
      deleteIpdSummary({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdSummary {ipdSummary.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdSummary.id}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdSummary.ipdId}</td>
            </tr>
            <tr>
              <th>Summary</th>
              <td>{jsonDisplay(ipdSummary.summary)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdSummary.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdSummary.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdSummary({ id: ipdSummary.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdSummary.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdSummary
