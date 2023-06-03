import Charges from 'src/components/Charges/Charges'

export const QUERY = gql`
  query FindChargesById($id: Int!) {
    charges: charges(id: $id) {
      id
      name
      amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Charges not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ charges }) => {
  return <Charges charges={charges} />
}
