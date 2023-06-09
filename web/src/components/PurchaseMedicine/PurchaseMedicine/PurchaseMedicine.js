import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePurchaseMedicineMutation($id: Int!) {
    deletePurchaseMedicine(id: $id) {
      id
    }
  }
`

const PurchaseMedicine = ({ purchaseMedicine }) => {
  const [deletePurchaseMedicine] = useMutation(
    DELETE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine deleted')
        navigate(routes.purchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="bg-white p-6 shadow-lg rounded-lg grid gap-4 grid-cols-2 text-sm">

        <div className="col-span-2">
          <table className="w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                <td className="p-4">{purchaseMedicine.id}</td>
              </tr>
              <tr>
                <th className="p-4">Invoice no</th>
                <td className="p-4">{purchaseMedicine.invoiceNo}</td>
              </tr>
              <tr>
                <th className="p-4">Distributor Name</th>
                <td className="p-4">{purchaseMedicine.did.name}</td>
              </tr>
              <tr>
                <th className="p-4">Date</th>
                <td className="p-4">{timeTag(purchaseMedicine.date)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-span-2">
          <h3 className=" font-bold mb-4">Product Information</h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-4">Manufacturer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Paid Quantity</th>
                <th className="p-4">Free Quantity</th>
                <th className="p-4">Pack</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Rate</th>
                <th className="p-4">Discount</th>
                <th className="p-4">SGST</th>
                <th className="p-4">CGST</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchaseMedicine.medicine.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">{item.mfr.name}</td>
                  <td className="p-4">{item.product.name}</td>
                  <td className="p-4">{item.batch}</td>
                  <td className="p-4">{item.paid_qty}</td>
                  <td className="p-4">{item.free_qty}</td>
                  <td className="p-4">{item.pack}</td>
                  <td className="p-4">{item.exp}</td>
                  <td className="p-4">{item.mrp}</td>
                  <td className="p-4">{item.rate}</td>
                  <td className="p-4">{item.dis}</td>
                  <td className="p-4">{item.sgst}</td>
                  <td className="p-4">{item.cgst}</td>
                  <td className="p-4">{item.amount}</td>
                  <td className="p-4">{item.net_amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <p className=" font-bold">Total</p>
          <p className="p-4">{purchaseMedicine.total}</p>
        </div>

        <div>
          <p className=" font-bold">Discount</p>
          <p className="p-4">{purchaseMedicine.discount}</p>
        </div>

        <div>
          <p className=" font-bold">Sgst</p>
          <p className="p-4">{purchaseMedicine.sgst.toFixed(2)}</p>
        </div>

        <div>
          <p className=" font-bold">Cgst</p>
          <p className="p-4">{purchaseMedicine.cgst.toFixed(2)}</p>
        </div>

        <div>
          <p className=" font-bold">Grand total</p>
          <p className="p-4">{purchaseMedicine.grand_total}</p>
        </div>

        <div>
          <p className=" font-bold">Created at</p>
          <p className="p-4">{timeTag(purchaseMedicine.created_at)}</p>
        </div>

        <div>
          <p className=" font-bold">Updated at</p>
          <p className="p-4">{timeTag(purchaseMedicine.updated_at)}</p>
        </div>
      </div>

      <nav className="rw-button-group">
        {/* <Link
          to={routes.editPurchaseMedicine({ id: purchaseMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(purchaseMedicine.id)}
        >
          Delete
        </button> */}
      </nav>
    </>
  )
}

export default PurchaseMedicine
