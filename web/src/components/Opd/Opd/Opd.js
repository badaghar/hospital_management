import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_OPD_MUTATION = gql`
  mutation DeleteOpdMutation($id: Int!) {
    deleteOpd(id: $id) {
      id
    }
  }
`

const Opd = ({ opd }) => {
  const [deleteOpd] = useMutation(DELETE_OPD_MUTATION, {
    onCompleted: () => {
      toast.success('Opd deleted')
      navigate(routes.opds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete opd ' + id + '?')) {
      deleteOpd({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Opd {opd.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{opd.id}</td>
            </tr>
            <tr>
              <th>Consultant doctor</th>
              <td>{opd.consultant_doctor}</td>
            </tr>
            <tr>
              <th>Charges</th>
              <td>{jsonDisplay(opd.charges)}</td>
            </tr>
            <tr>
              <th>Payment mode</th>
              <td>{opd.paymentMode}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{opd.amount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(opd.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(opd.updated_at)}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{opd.patientId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOpd({ id: opd.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(opd.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Opd
