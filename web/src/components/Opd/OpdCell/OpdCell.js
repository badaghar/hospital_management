import Opd from 'src/components/Opd/Opd'

export const QUERY = gql`
  query FindOpdById($id: Int!) {
    opd: opd(id: $id) {
      id
      consultant_doctor
      charges
      paymentMode
      amount
      created_at
      updated_at
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Opd not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ opd }) => {
  return <Opd opd={opd} />
}
