import PurchaseMedicine from 'src/components/PurchaseMedicine/PurchaseMedicine'

export const QUERY = gql`
  query FindPurchaseMedicineById($id: Int!) {
    purchaseMedicine: purchaseMedicine(id: $id) {
      id
      invoiceNo
      distributerId
      did{
        name
      }
      date
      medicine
      return
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at

    }
    distributers{
      id
      name
    }
    manufacturers{
      id
      name
      Product{
        id
        name
      }
    }
    products{
      id
      name
    }
    compositions{
      id
      name
    },
    returnExpiryMedicines{
      medicine
      return_med
      distributerId
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PurchaseMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchaseMedicine,distributers,manufacturers ,products,compositions,returnExpiryMedicines }) => {
  return <PurchaseMedicine purchaseMedicine={purchaseMedicine}
  distributers={distributers} manufacturers={manufacturers} products={products} compositions={compositions} returnExpiryMedicines={returnExpiryMedicines}

  />
}
