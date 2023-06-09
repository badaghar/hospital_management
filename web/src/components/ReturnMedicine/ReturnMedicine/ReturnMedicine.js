import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_RETURN_MEDICINE_MUTATION = gql`
  mutation DeleteReturnMedicineMutation($id: Int!) {
    deleteReturnMedicine(id: $id) {
      id
    }
  }
`

const ReturnMedicine = ({ returnMedicine }) => {
  const [deleteReturnMedicine] = useMutation(DELETE_RETURN_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('ReturnMedicine deleted')
      navigate(routes.returnMedicines())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete returnMedicine ' + id + '?')) {
      deleteReturnMedicine({ variables: { id } })
    }
  }

  return (
    <>
      {/* <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ReturnMedicine {returnMedicine.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{returnMedicine.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(returnMedicine.date)}</td>
            </tr>
            <tr>
              <th>Medicine</th>
              <td>{jsonDisplay(returnMedicine.medicine)}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{returnMedicine.total}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td>{returnMedicine.discount}</td>
            </tr>
            <tr>
              <th>Sgst</th>
              <td>{returnMedicine.sgst}</td>
            </tr>
            <tr>
              <th>Cgst</th>
              <td>{returnMedicine.cgst}</td>
            </tr>
            <tr>
              <th>Grand total</th>
              <td>{returnMedicine.grand_total}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(returnMedicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(returnMedicine.updated_at)}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{returnMedicine.patientId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReturnMedicine({ id: returnMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(returnMedicine.id)}
        >
          Delete
        </button>
      </nav> */}
      <div className="bg-white p-6 shadow-lg rounded-lg grid gap-4 grid-cols-2 text-sm">


        <div className="col-span-2">
          <table className="w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                <td className="p-4">{returnMedicine.id}</td>
              </tr>
              <tr>
                <th className="p-4">Date</th>
                <td className="p-4">{timeTag(returnMedicine.date)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-span-2">
          <h3 className=" font-bold mb-4">Product Information</h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">CGST/SGST</th>
                <th className="p-4">Amount</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {returnMedicine.medicine.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">{item['medicine Name']}</td>
                  <td className="p-4">{item['batch No']}</td>
                  <td className="p-4">{item['Expiry Date']}</td>
                  <td className="p-4">{item['mrp']}</td>
                  <td className="p-4">{item['quantity']}</td>
                  <td className="p-4">{item['cgst/sgst']}</td>
                  <td className="p-4">{item['amount']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <p className=" font-bold">Total</p>
          <p className="p-4">{returnMedicine.total}</p>
        </div>

        <div>
          <p className=" font-bold">Sgst</p>
          <p className="p-4">{returnMedicine.sgst}</p>
        </div>

        <div>
          <p className=" font-bold">Cgst</p>
          <p className="p-4">{returnMedicine.cgst}</p>
        </div>

        <div>
          <p className=" font-bold">Grand total</p>
          <p className="p-4">{returnMedicine.grand_total}</p>
        </div>

        <div>
          <p className=" font-bold">Created at</p>
          <p className="p-4">{timeTag(returnMedicine.created_at)}</p>
        </div>

        <div>
          <p className=" font-bold">Updated at</p>
          <p className="p-4">{timeTag(returnMedicine.updated_at)}</p>
        </div>
      </div>
    </>
  )
}

export default ReturnMedicine
