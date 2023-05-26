import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProductToCompositionForm from 'src/components/ProductToComposition/ProductToCompositionForm'

const CREATE_PRODUCT_TO_COMPOSITION_MUTATION = gql`
  mutation CreateProductToCompositionMutation(
    $input: CreateProductToCompositionInput!
  ) {
    createProductToComposition(input: $input) {
      id
    }
  }
`

const NewProductToComposition = () => {
  const [createProductToComposition, { loading, error }] = useMutation(
    CREATE_PRODUCT_TO_COMPOSITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('ProductToComposition created')
        navigate(routes.productToCompositions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createProductToComposition({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ProductToComposition
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProductToCompositionForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewProductToComposition
