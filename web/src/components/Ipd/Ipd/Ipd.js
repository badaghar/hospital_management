import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_MUTATION = gql`
  mutation DeleteIpdMutation($id: Int!) {
    deleteIpd(id: $id) {
      id
    }
  }
`

const Ipd = ({ ipd }) => {
  const [deleteIpd] = useMutation(DELETE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Ipd deleted')
      navigate(routes.ipds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipd ' + id + '?')) {
      deleteIpd({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ipd {ipd.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipd.id}</td>
            </tr>
            <tr>
              <th>Consultant doctor</th>
              <td>{ipd.consultant_doctor}</td>
            </tr>
            <tr>
              <th>Date of admission</th>
              <td>{timeTag(ipd.date_of_admission)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipd.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipd.updated_at)}</td>
            </tr>
            <tr>
              <th>Paid amount</th>
              <td>{ipd.paid_amount}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{ipd.patientId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpd({ id: ipd.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipd.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Ipd
