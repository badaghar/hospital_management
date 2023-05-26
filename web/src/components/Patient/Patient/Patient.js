import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatientMutation($id: Int!) {
    deletePatient(id: $id) {
      id
    }
  }
`

const Patient = ({ patient }) => {
  const [deletePatient] = useMutation(DELETE_PATIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Patient deleted')
      navigate(routes.patients())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete patient ' + id + '?')) {
      deletePatient({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Patient {patient.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{patient.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{patient.name}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{patient.age}</td>
            </tr>
            <tr>
              <th>Phone no</th>
              <td>{patient.phone_no}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{patient.gender}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{patient.address}</td>
            </tr>
            <tr>
              <th>Doctor fee id</th>
              <td>{patient.doctorFeeId}</td>
            </tr>
            <tr>
              <th>Date of admission</th>
              <td>{timeTag(patient.date_of_admission)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(patient.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(patient.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPatient({ id: patient.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(patient.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Patient
