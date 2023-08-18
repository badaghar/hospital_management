import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from "src/auth"

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePurchaseMedicineMutation($id: Int!) {
    deletePurchaseMedicine(id: $id) {
      id
    }
  }
`

const PurchaseMedicine = ({ purchaseMedicine }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  console.log(purchaseMedicine)
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
  console.log('====================================');
  console.log(purchaseMedicine);
  console.log('====================================');

  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-lg grid gap-4 grid-cols-2 text-sm">

        <div className="col-span-2">
          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Invoice no</th>
                <th className="p-4">Distributor Name</th>
                <th className="p-4">Date</th>
              </tr>
              <tr>
                <td className="p-4">{purchaseMedicine.id}</td>
                <td className="p-4">{purchaseMedicine.invoiceNo}</td>
                <td className="p-4">{purchaseMedicine.did.name}</td>
                <td className="p-4">{purchaseMedicine.date.split('T00:00:00.000Z')}</td>
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
                  <td className="p-4">{item.exp ? item.exp.split('-')[1] + '-' + item.exp.split('-')[0] : '04-2026'} </td>
                  <td className="p-4">{item.mrp.toFixed(2)}</td>
                  <td className="p-4">{item.rate.toFixed(2)}</td>
                  <td className="p-4">{item.dis.toFixed(2)}</td>
                  <td className="p-4">{item.sgst}</td>
                  <td className="p-4">{item.cgst}</td>
                  <td className="p-4">{item.amount.toFixed(2)}</td>
                  <td className="p-4">{isNaN(parseFloat(item.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(item.net_amount).toFixed(2)}</td>
                </tr>
              ))}

              {
                purchaseMedicine.return &&
                <>
                  <h3 className=" font-bold mb-4">Return Medicine</h3>

               { purchaseMedicine?.return?.map((item, index) => (

                  <tr key={index}>
                    <td className="p-4">{item.props.value.medicine.mfr.name}</td>
                    <td className="p-4">{item.props.value.medicine.product.name}</td>
                    <td className="p-4">{item.props.value.medicine.batch}</td>
                    <td className="p-4">{item.props.value.medicine.paid_qty}</td>
                    <td className="p-4">{item.props.value.medicine.free_qty}</td>
                    <td className="p-4">{item.props.value.medicine.pack}</td>
                    <td className="p-4">{item.props.value.medicine.exp ? item.props.value.medicine.exp.split('-')[1] + '-' + item.props.value.medicine.exp.split('-')[0] : '04-2026'} </td>
                    <td className="p-4">{item.props.value.medicine.mrp.toFixed(2)}</td>
                    <td className="p-4">{item.props.value.medicine.rate.toFixed(2)}</td>
                    <td className="p-4">{item.props.value.medicine.dis.toFixed(2)}</td>
                    <td className="p-4">{item.props.value.medicine.sgst}</td>
                    <td className="p-4">{item.props.value.medicine.cgst}</td>
                    <td className="p-4">{item.props.value.medicine.amount.toFixed(2)}</td>
                    <td className="p-4">{isNaN(parseFloat(item.props.value.medicine.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(item.props.value.medicine.net_amount).toFixed(2)}</td>
                  </tr>
                  ))}



                </>
              }
            </tbody>
          </table>
        </div>

        <div className="col-span-2">

          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <td className="p-4 font-bold">Total</td>
                <td className="p-4 font-bold">Discount</td>
                <td className="p-4 font-bold">Sgst</td>
                <td className="p-4 font-bold">Cgst</td>
                <td className="p-4 font-bold">Grand total</td>
                <td className="p-4 font-bold">Created at</td>
              </tr>

              <tr className=''>
                <td className="p-4">{purchaseMedicine.total}</td>
                <td className="p-4">{purchaseMedicine.discount.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.sgst.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.cgst.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.grand_total.toFixed(2)}</td>
                <td className="p-4">{purchaseMedicine.created_at.split('T')[0]}</td>
              </tr>
              {/* {    date = new Date().toLocaleDateString() } */}

            </tbody>
          </table>
        </div>
      </div>

      <nav className="rw-button-group">
        {/* <Link
          to={routes.editPurchaseMedicine({ id: purchaseMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        {hasRole('admin') && <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(purchaseMedicine.id)}
        >
          Delete
        </button>}
      </nav>
    </>
  )
}

export default PurchaseMedicine
