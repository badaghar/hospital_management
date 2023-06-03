import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_CONSULTATION_MUTATION = gql`
  mutation DeleteIpdConsultationMutation($id: Int!) {
    deleteIpdConsultation(id: $id) {
      id
    }
  }
`

const IpdConsultation = ({ ipdConsultation }) => {
  const [deleteIpdConsultation] = useMutation(
    DELETE_IPD_CONSULTATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdConsultation deleted')
        navigate(routes.ipdConsultations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete ipdConsultation ' + id + '?')
    ) {
      deleteIpdConsultation({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdConsultation {ipdConsultation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdConsultation.id}</td>
            </tr>
            <tr>
              <th>Consultation doctor</th>
              <td>{ipdConsultation.consultation_doctor}</td>
            </tr>
            <tr>
              <th>Consultation type</th>
              <td>{ipdConsultation.consultation_type}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{ipdConsultation.amount}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdConsultation.ipdId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdConsultation.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdConsultation.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdConsultation({ id: ipdConsultation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdConsultation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdConsultation
