import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProductToCompositionForm from 'src/components/ProductToComposition/ProductToCompositionForm'

export const QUERY = gql`
  query EditProductToCompositionById($id: Int!) {
    productToComposition: productToComposition(id: $id) {
      id
      compositionId
      productId
    }
  }
`
const UPDATE_PRODUCT_TO_COMPOSITION_MUTATION = gql`
  mutation UpdateProductToCompositionMutation(
    $id: Int!
    $input: UpdateProductToCompositionInput!
  ) {
    updateProductToComposition(id: $id, input: $input) {
      id
      compositionId
      productId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ productToComposition }) => {
  const [updateProductToComposition, { loading, error }] = useMutation(
    UPDATE_PRODUCT_TO_COMPOSITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('ProductToComposition updated')
        navigate(routes.productToCompositions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProductToComposition({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ProductToComposition {productToComposition?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProductToCompositionForm
          productToComposition={productToComposition}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
