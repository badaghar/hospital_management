import Distributer from 'src/components/Distributer/Distributer'

export const QUERY = gql`
  query FindDistributerById($id: Int!) {
    distributer: distributer(id: $id) {
      id
      name
      phoneNo
      gstNo
      dlNo
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Distributer not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ distributer }) => {
  return <Distributer distributer={distributer} />
}
