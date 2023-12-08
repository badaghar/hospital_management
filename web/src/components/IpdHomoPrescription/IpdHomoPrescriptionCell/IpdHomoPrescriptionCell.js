import IpdHomoPrescription from 'src/components/IpdHomoPrescription/IpdHomoPrescription'

export const QUERY = gql`
  query FindIpdHomoPrescriptionById($id: Int!) {
    ipdHomoPrescription: ipdHomoPrescription(id: $id) {
      id
      ipdId
      medicine
      dosage
      timing
      frequency
      duration
      note
      rate
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdHomoPrescription not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdHomoPrescription }) => {
  return <IpdHomoPrescription ipdHomoPrescription={ipdHomoPrescription} />
}
