import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_IPD_PRESCRIPTION_MUTATION = gql`
  mutation DeleteIpdPrescriptionMutation($id: Int!) {
    deleteIpdPrescription(id: $id) {
      id
    }
  }
`

const IpdPrescription = ({ ipdPrescription }) => {
  const [deleteIpdPrescription] = useMutation(
    DELETE_IPD_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPrescription deleted')
        navigate(routes.ipdPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdPrescription {ipdPrescription.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdPrescription.id}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdPrescription.ipdId}</td>
            </tr>
            <tr>
              <th>Medicine</th>
              <td>{ipdPrescription.medicine}</td>
            </tr>
            <tr>
              <th>Dosage</th>
              <td>{ipdPrescription.dosage}</td>
            </tr>
            <tr>
              <th>Timing</th>
              <td>{ipdPrescription.timing}</td>
            </tr>
            <tr>
              <th>Frequency</th>
              <td>{ipdPrescription.frequency}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{ipdPrescription.duration}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{ipdPrescription.note}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdPrescription.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdPrescription.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(ipdPrescription.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdPrescription({ id: ipdPrescription.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdPrescription.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdPrescription
