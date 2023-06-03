import IpdConsultation from 'src/components/IpdConsultation/IpdConsultation'

export const QUERY = gql`
  query FindIpdConsultationById($id: Int!) {
    ipdConsultation: ipdConsultation(id: $id) {
      id
      consultation_doctor
      consultation_type
      amount
      ipdId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdConsultation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdConsultation }) => {
  return <IpdConsultation ipdConsultation={ipdConsultation} />
}
