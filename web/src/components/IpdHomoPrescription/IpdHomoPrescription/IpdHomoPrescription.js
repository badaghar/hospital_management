import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_IPD_HOMO_PRESCRIPTION_MUTATION = gql`
  mutation DeleteIpdHomoPrescriptionMutation($id: Int!) {
    deleteIpdHomoPrescription(id: $id) {
      id
    }
  }
`

const IpdHomoPrescription = ({ ipdHomoPrescription }) => {
  const [deleteIpdHomoPrescription] = useMutation(
    DELETE_IPD_HOMO_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdHomoPrescription deleted')
        navigate(routes.ipdHomoPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdHomoPrescription {ipdHomoPrescription.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdHomoPrescription.id}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdHomoPrescription.ipdId}</td>
            </tr>
            <tr>
              <th>Medicine</th>
              <td>{ipdHomoPrescription.medicine}</td>
            </tr>
            <tr>
              <th>Dosage</th>
              <td>{ipdHomoPrescription.dosage}</td>
            </tr>
            <tr>
              <th>Timing</th>
              <td>{ipdHomoPrescription.timing}</td>
            </tr>
            <tr>
              <th>Frequency</th>
              <td>{ipdHomoPrescription.frequency}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{ipdHomoPrescription.duration}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{ipdHomoPrescription.note}</td>
            </tr>
            <tr>
              <th>Rate</th>
              <td>{ipdHomoPrescription.rate}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdHomoPrescription.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdHomoPrescription.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(ipdHomoPrescription.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdHomoPrescription({ id: ipdHomoPrescription.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdHomoPrescription.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdHomoPrescription
