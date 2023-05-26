import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_DOCTOR_FEE_MUTATION = gql`
  mutation DeleteDoctorFeeMutation($id: Int!) {
    deleteDoctorFee(id: $id) {
      id
    }
  }
`

const DoctorFee = ({ doctorFee }) => {
  const [deleteDoctorFee] = useMutation(DELETE_DOCTOR_FEE_MUTATION, {
    onCompleted: () => {
      toast.success('DoctorFee deleted')
      navigate(routes.doctorFees())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete doctorFee ' + id + '?')) {
      deleteDoctorFee({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            DoctorFee {doctorFee.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{doctorFee.id}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{doctorFee.type}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{doctorFee.amount}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{doctorFee.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(doctorFee.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(doctorFee.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDoctorFee({ id: doctorFee.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(doctorFee.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default DoctorFee
