import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePurchaseMedicineMutation($id: Int!) {
    deletePurchaseMedicine(id: $id) {
      id
    }
  }
`

const PurchaseMedicinesList = ({ purchaseMedicines }) => {
  const [deletePurchaseMedicine] = useMutation(
    DELETE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine deleted')
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
      confirm('Are you sure you want to delete purchaseMedicine ' + id + '?')
    ) {
      deletePurchaseMedicine({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Invoice no</th>
            <th>Distributer Name</th>
            <th>Date</th>
            {/* <th>Medicine</th> */}
            <th>Total</th>
            <th>Discount</th>
            <th>Sgst</th>
            <th>Cgst</th>
            <th>Grand total</th>
            {/* <th>Created at</th>
            <th>Updated at</th> */}
            <th><Link
                    to={routes.downloadPurchaseMedicine()}

                    className="rw-button rw-button-small"
                  >
                    Download
                  </Link></th>
          </tr>
        </thead>
        <tbody>
          {purchaseMedicines.map((purchaseMedicine) => (
            <tr key={purchaseMedicine.id}>
              {/* <td>{truncate(purchaseMedicine.id)}</td> */}
              <td>{truncate(purchaseMedicine.invoiceNo)}</td>
              <td>{truncate(purchaseMedicine.did.name)}</td>

              <td>{timeTag(purchaseMedicine.date)}</td>
              {/* <td>{jsonTruncate(purchaseMedicine.medicine)}</td> */}
              <td>{truncate(purchaseMedicine.total)}</td>
              <td>{truncate(purchaseMedicine.discount)}</td>
              <td>{truncate(purchaseMedicine.sgst)}</td>
              <td>{truncate(purchaseMedicine.cgst)}</td>
              <td>{truncate(purchaseMedicine.grand_total)}</td>
              {/* <td>{timeTag(purchaseMedicine.created_at)}</td>
              <td>{timeTag(purchaseMedicine.updated_at)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.purchaseMedicine({ id: purchaseMedicine.id })}
                    title={
                      'Show purchaseMedicine ' + purchaseMedicine.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>

                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PurchaseMedicinesList
