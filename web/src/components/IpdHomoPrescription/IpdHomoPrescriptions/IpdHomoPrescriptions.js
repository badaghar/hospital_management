import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdHomoPrescription/IpdHomoPrescriptionsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_HOMO_PRESCRIPTION_MUTATION = gql`
  mutation DeleteIpdHomoPrescriptionMutation($id: Int!) {
    deleteIpdHomoPrescription(id: $id) {
      id
    }
  }
`

const IpdHomoPrescriptionsList = ({ ipdHomoPrescriptions }) => {
  const [deleteIpdHomoPrescription] = useMutation(
    DELETE_IPD_HOMO_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdHomoPrescription deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete ipdHomoPrescription ' + id + '?')
    ) {
      deleteIpdHomoPrescription({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Ipd id</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Timing</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Note</th>
            <th>Rate</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdHomoPrescriptions.map((ipdHomoPrescription) => (
            <tr key={ipdHomoPrescription.id}>
              <td>{truncate(ipdHomoPrescription.id)}</td>
              <td>{truncate(ipdHomoPrescription.ipdId)}</td>
              <td>{truncate(ipdHomoPrescription.medicine)}</td>
              <td>{truncate(ipdHomoPrescription.dosage)}</td>
              <td>{truncate(ipdHomoPrescription.timing)}</td>
              <td>{truncate(ipdHomoPrescription.frequency)}</td>
              <td>{truncate(ipdHomoPrescription.duration)}</td>
              <td>{truncate(ipdHomoPrescription.note)}</td>
              <td>{truncate(ipdHomoPrescription.rate)}</td>
              <td>{timeTag(ipdHomoPrescription.created_at)}</td>
              <td>{timeTag(ipdHomoPrescription.updated_at)}</td>
              <td>{jsonTruncate(ipdHomoPrescription.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdHomoPrescription({
                      id: ipdHomoPrescription.id,
                    })}
                    title={
                      'Show ipdHomoPrescription ' +
                      ipdHomoPrescription.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdHomoPrescription({
                      id: ipdHomoPrescription.id,
                    })}
                    title={'Edit ipdHomoPrescription ' + ipdHomoPrescription.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete ipdHomoPrescription ' + ipdHomoPrescription.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdHomoPrescription.id)}
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

export default IpdHomoPrescriptionsList
