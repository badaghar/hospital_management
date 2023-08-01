export const QUERY = gql`
  query FindPurchaseTyreHeaderQuery($id: Int!) {
    purchaseTyreHeader: purchaseTyreHeader(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ purchaseTyreHeader }) => {
  return <div>{JSON.stringify(purchaseTyreHeader)}</div>
}
