import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from "src/auth"

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_SALE_MEDICINE_MUTATION = gql`
  mutation DeleteSaleMedicineMutation($id: Int!) {
    deleteSaleMedicine(id: $id) {
      id
    }
  }
`

const SaleMedicine = ({ saleMedicine }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  console.log(saleMedicine)

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
          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Bill No </th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Date</th>
              </tr>
              <tr>
                <td className="p-4">{saleMedicine.id}</td>
                <td className="p-4">{saleMedicine.billNo}</td>
                <td className="p-4">{saleMedicine.patient.name}</td>
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
                  <td className="p-4">{item['Expiry Date'].split('-')[1] + '-' + item['Expiry Date'].split('-')[0]}</td>
                  <td className="p-4">{item['mrp']}</td>
                  <td className="p-4">{item['quantity']}</td>
                  <td className="p-4">{item['cgst/sgst']}</td>
                  <td className="p-4">{item['amount']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-2">
          <h3 className=" font-bold mb-4">Homopathy Product Information</h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Amount</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              { saleMedicine.homo_medicine && saleMedicine.homo_medicine.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">{item['medicine Name']}</td>
                  <td className="p-4">{item['amount']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="col-span-2">
          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <th className=" font-bold">Total</th>
                <th className=" font-bold">Discount</th>
                <th className=" font-bold">Sgst</th>
                <th className=" font-bold">Cgst</th>
                <th className=" font-bold">Grand total</th>
                <th className=" font-bold">Created at</th>
                <th className=" font-bold">Updated at</th>
              </tr>
              <tr>
                <td className="p-4">{saleMedicine.total}</td>
                <td className="p-4">{saleMedicine.discount}</td>
                <td className="p-4">{saleMedicine.sgst}</td>
                <td className="p-4">{saleMedicine.cgst}</td>
                <td className="p-4">{saleMedicine.grand_total}</td>
                <td className="p-4">{timeTag(saleMedicine.created_at)}</td>
                <td className="p-4">{timeTag(saleMedicine.updated_at)}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <nav className="rw-button-group">
          {/* <Link
          to={routes.editSaleMedicine({ id: saleMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
          {hasRole('admin') && <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(saleMedicine.id)}
          >
            Delete
          </button>}
        </nav>
      </div>

    </>
  )
}

export default SaleMedicine
