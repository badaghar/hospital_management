import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdPrescription/IpdPrescriptionsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_PRESCRIPTION_MUTATION = gql`
  mutation DeleteIpdPrescriptionMutation($id: Int!) {
    deleteIpdPrescription(id: $id) {
      id
    }
  }
`

const IpdPrescriptionsList = ({ ipdPrescriptions }) => {
  const [deleteIpdPrescription] = useMutation(
    DELETE_IPD_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPrescription deleted')
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
      confirm('Are you sure you want to delete ipdPrescription ' + id + '?')
    ) {
      deleteIpdPrescription({ variables: { id } })
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
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdPrescriptions.map((ipdPrescription) => (
            <tr key={ipdPrescription.id}>
              <td>{truncate(ipdPrescription.id)}</td>
              <td>{truncate(ipdPrescription.ipdId)}</td>
              <td>{truncate(ipdPrescription.medicine)}</td>
              <td>{truncate(ipdPrescription.dosage)}</td>
              <td>{truncate(ipdPrescription.timing)}</td>
              <td>{truncate(ipdPrescription.frequency)}</td>
              <td>{truncate(ipdPrescription.duration)}</td>
              <td>{truncate(ipdPrescription.note)}</td>
              <td>{timeTag(ipdPrescription.created_at)}</td>
              <td>{timeTag(ipdPrescription.updated_at)}</td>
              <td>{jsonTruncate(ipdPrescription.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdPrescription({ id: ipdPrescription.id })}
                    title={
                      'Show ipdPrescription ' + ipdPrescription.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdPrescription({ id: ipdPrescription.id })}
                    title={'Edit ipdPrescription ' + ipdPrescription.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdPrescription ' + ipdPrescription.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdPrescription.id)}
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

export default IpdPrescriptionsList
