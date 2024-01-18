import Patient from 'src/components/Patient/Patient'

export const QUERY = gql`
  query FindPatientById($id: Int!) {
    patient: patient(id: $id) {
      id
      name
      age
      phone_no
      gender
      address
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Patient not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ patient }) => {
  return <Patient patient={patient} />
}
