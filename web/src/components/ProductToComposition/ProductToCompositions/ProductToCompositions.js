import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ProductToComposition/ProductToCompositionsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_PRODUCT_TO_COMPOSITION_MUTATION = gql`
  mutation DeleteProductToCompositionMutation($id: Int!) {
    deleteProductToComposition(id: $id) {
      id
    }
  }
`

const ProductToCompositionsList = ({ productToCompositions }) => {
  const [deleteProductToComposition] = useMutation(
    DELETE_PRODUCT_TO_COMPOSITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('ProductToComposition deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Composition id</th>
            <th>Product id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {productToCompositions.map((productToComposition) => (
            <tr key={productToComposition.id}>
              <td>{truncate(productToComposition.id)}</td>
              <td>{truncate(productToComposition.compositionId)}</td>
              <td>{truncate(productToComposition.productId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.productToComposition({
                      id: productToComposition.id,
                    })}
                    title={
                      'Show productToComposition ' +
                      productToComposition.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editProductToComposition({
                      id: productToComposition.id,
                    })}
                    title={
                      'Edit productToComposition ' + productToComposition.id
                    }
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete productToComposition ' + productToComposition.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(productToComposition.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductToCompositionsList
