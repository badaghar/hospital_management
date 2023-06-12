import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PurchaseMedicineForm from 'src/components/PurchaseMedicine/PurchaseMedicineForm'

const CREATE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation CreatePurchaseMedicineMutation(
    $input: CreatePurchaseMedicineInput!
  ) {
    createPurchaseMedicine(input: $input) {
      id
    }
  }
`
export const QUERY = gql`
  query CheckPurchasesQuery {
    distributers{
      id
      name
    }
    manufacturers{
      id
      name
    }
    products{
      id
      name
    }
    purchaseMedicines{
      invoiceNo
    }
    compositions{
      id
      name
    }
  }
`



export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ distributers,manufacturers ,products,purchaseMedicines,compositions}) => {

  const [createPurchaseMedicine, { loading, error }] = useMutation(
    CREATE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine created')
        navigate(routes.purchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createPurchaseMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PurchaseMedicine
        </h2>
      </header>
      <div className="rw-segment-main">
        <PurchaseMedicineForm onSave={onSave} loading={loading} error={error} distributers={distributers} manufacturers={manufacturers} products={products} purchaseMedicines={purchaseMedicines} compositions={compositions}/>
      </div>
    </div>
  )
}
