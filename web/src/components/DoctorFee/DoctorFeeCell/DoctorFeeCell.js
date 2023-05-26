import DoctorFee from 'src/components/DoctorFee/DoctorFee'

export const QUERY = gql`
  query FindDoctorFeeById($id: Int!) {
    doctorFee: doctorFee(id: $id) {
      id
      type
      amount
      userId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>DoctorFee not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ doctorFee }) => {
  return <DoctorFee doctorFee={doctorFee} />
}
