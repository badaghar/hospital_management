import { Link, routes } from '@redwoodjs/router'

import ProductToCompositions from 'src/components/ProductToComposition/ProductToCompositions'

export const QUERY = gql`
  query FindProductToCompositions {
    productToCompositions {
      id
      compositionId
      productId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No productToCompositions yet. '}
      <Link to={routes.newProductToComposition()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ productToCompositions }) => {
  return <ProductToCompositions productToCompositions={productToCompositions} />
}
