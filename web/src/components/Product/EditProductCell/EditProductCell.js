import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useLayoutEffect, useState } from 'react'

import ProductForm from 'src/components/Product/ProductForm'

export const QUERY = gql`
  query EditProductById($id: Int!) {
    product: product(id: $id) {
      id
      name
      manufacturerId
      mid{
        id
        name
      }


      ProductToComposition {
      cid {
        id
        name
      }

    }
      created_at
      updated_at
    }
    compositions {
      id
      name
    }
    manufacturers{
      id
      name
    }

  }
`
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($id: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      manufacturerId
      created_at
      updated_at

    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product ,compositions,manufacturers}) => {
  const [defaultComposition, setDefaultComposition] = useState([])
  const [defaultManufacturer,setDefaultManufacutrer] = useState([])

  // useEffect(() => {

  //   // console.log([{id:product.mid.id,name:product.mid.name}])

  // }, []);

  console.log(defaultComposition,defaultManufacturer)
  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Product updated')
        window.location.reload(true);
        navigate(routes.products())
        window.location.reload(false);
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProduct({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Product {product?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProductForm
          product={product}
          onSave={onSave}
          error={error}
          loading={loading}
          compostions = {compositions}
          defaultComposition = {defaultComposition}
          defaultManufacturer = {defaultManufacturer}
          manufacturers = {manufacturers}
        />
      </div>
    </div>
  )
}
