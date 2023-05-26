import ProductToComposition from 'src/components/ProductToComposition/ProductToComposition'

export const QUERY = gql`
  query FindProductToCompositionById($id: Int!) {
    productToComposition: productToComposition(id: $id) {
      id
      compositionId
      productId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ProductToComposition not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ productToComposition }) => {
  return <ProductToComposition productToComposition={productToComposition} />
}
