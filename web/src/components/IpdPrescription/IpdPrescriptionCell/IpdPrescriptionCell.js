import IpdPrescription from 'src/components/IpdPrescription/IpdPrescription'

export const QUERY = gql`
  query FindIpdPrescriptionById($id: Int!) {
    ipdPrescription: ipdPrescription(id: $id) {
      id
      ipdId
      medicine
      dosage
      timing
      frequency
      duration
      note
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdPrescription not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdPrescription }) => {
  return <IpdPrescription ipdPrescription={ipdPrescription} />
}
