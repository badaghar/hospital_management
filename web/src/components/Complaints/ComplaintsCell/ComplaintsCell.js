import Complaints from 'src/components/Complaints/Complaints'

export const QUERY = gql`
  query FindComplaintsById($id: Int!) {
    complaints: complaints(id: $id) {
      id
      note
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Complaints not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ complaints }) => {
  return <Complaints complaints={complaints} />
}
