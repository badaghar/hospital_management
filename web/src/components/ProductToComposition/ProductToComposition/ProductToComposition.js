import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_PRODUCT_TO_COMPOSITION_MUTATION = gql`
  mutation DeleteProductToCompositionMutation($id: Int!) {
    deleteProductToComposition(id: $id) {
      id
    }
  }
`

const ProductToComposition = ({ productToComposition }) => {
  const [deleteProductToComposition] = useMutation(
    DELETE_PRODUCT_TO_COMPOSITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('ProductToComposition deleted')
        navigate(routes.productToCompositions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm(
        'Are you sure you want to delete productToComposition ' + id + '?'
      )
    ) {
      deleteProductToComposition({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ProductToComposition {productToComposition.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{productToComposition.id}</td>
            </tr>
            <tr>
              <th>Composition id</th>
              <td>{productToComposition.compositionId}</td>
            </tr>
            <tr>
              <th>Product id</th>
              <td>{productToComposition.productId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editProductToComposition({ id: productToComposition.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(productToComposition.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ProductToComposition
