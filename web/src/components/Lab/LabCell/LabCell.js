import Lab from 'src/components/Lab/Lab'

export const QUERY = gql`
  query FindLabById($id: Int!) {
    lab: lab(id: $id) {
      id
      name
      phone_no
      Address
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Lab not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ lab }) => {
  return <Lab lab={lab} />
}
