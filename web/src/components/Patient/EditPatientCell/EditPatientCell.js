import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PatientForm from 'src/components/Patient/PatientForm'

export const QUERY = gql`
  query EditPatientById($id: Int!) {
    patient: patient(id: $id) {
      id
      name
      age
      phone_no
      gender
      address
      extra
      created_at
      updated_at
    }
    users{
      id
      name
      roles
    }
  }
`
const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatientMutation($id: Int!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
      age
      phone_no
      gender
      address
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ patient,users }) => {
  const [updatePatient, { loading, error }] = useMutation(
    UPDATE_PATIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Patient updated')
        navigate(routes.patients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updatePatient({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Patient {patient?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PatientForm
          patient={patient}
          onSave={onSave}
          error={error}
          loading={loading}
          users={users}
        />
      </div>
    </div>
  )
}
