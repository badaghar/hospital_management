import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_SALE_MEDICINE_MUTATION = gql`
  mutation DeleteSaleMedicineMutation($id: Int!) {
    deleteSaleMedicine(id: $id) {
      id
    }
  }
`

const SaleMedicine = ({ saleMedicine }) => {
  const [deleteSaleMedicine] = useMutation(DELETE_SALE_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('SaleMedicine deleted')
      navigate(routes.saleMedicines())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete saleMedicine ' + id + '?')) {
      deleteSaleMedicine({ variables: { id } })
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
          <td className="p-4">{saleMedicine.id}</td>
        </tr>
        <tr>
          <th className="p-4">Bill No </th>
          <td className="p-4">{saleMedicine.billNo}</td>
        </tr>
        <tr>
          <th className="p-4">Date</th>
          <td className="p-4">{saleMedicine.date.split('T00:00:00.000Z')}</td>
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
        {saleMedicine.medicine.map((item, index) => (
          <tr key={index}>
            <td className="p-4">{item['medicine Name']}</td>
            <td className="p-4">{item['batch No']}</td>
            <td className="p-4">{item['Expiry Date'].split('-')[1] +'-'+item['Expiry Date'].split('-')[0]}</td>
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
    <p className="p-4">{saleMedicine.total}</p>
  </div>

  <div>
    <p className=" font-bold">Discount</p>
    <p className="p-4">{saleMedicine.discount}</p>
  </div>

  <div>
    <p className=" font-bold">Sgst</p>
    <p className="p-4">{saleMedicine.sgst}</p>
  </div>

  <div>
    <p className=" font-bold">Cgst</p>
    <p className="p-4">{saleMedicine.cgst}</p>
  </div>

  <div>
    <p className=" font-bold">Grand total</p>
    <p className="p-4">{saleMedicine.grand_total}</p>
  </div>

  <div>
    <p className=" font-bold">Created at</p>
    <p className="p-4">{timeTag(saleMedicine.created_at)}</p>
  </div>

  <div>
    <p className=" font-bold">Updated at</p>
    <p className="p-4">{timeTag(saleMedicine.updated_at)}</p>
  </div>

  {/* <nav className="rw-button-group">
        <Link
          to={routes.editSaleMedicine({ id: saleMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(saleMedicine.id)}
        >
          Delete
        </button>
      </nav> */}
  </div>

    </>
  )
}

export default SaleMedicine
