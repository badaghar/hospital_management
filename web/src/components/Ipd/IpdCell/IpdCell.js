import Ipd from 'src/components/Ipd/Ipd'

export const QUERY = gql`
  query FindIpdById($id: Int!) {
    ipd: ipd(id: $id) {
      id
      consultant_doctor
      date_of_admission
      created_at
      updated_at
      paid_amount
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Ipd not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipd }) => {
  return <Ipd ipd={ipd} />
}
