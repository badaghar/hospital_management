import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeleteManufacturerPurchaseMedicineMutation($id: Int!) {
    deleteManufacturerPurchaseMedicine(id: $id) {
      id
    }
  }
`

const ManufacturerPurchaseMedicine = ({ manufacturerPurchaseMedicine }) => {
  const [deleteManufacturerPurchaseMedicine] = useMutation(
    DELETE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ManufacturerPurchaseMedicine deleted')
        navigate(routes.manufacturerPurchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm(
        'Are you sure you want to delete manufacturerPurchaseMedicine ' +
          id +
          '?'
      )
    ) {
      deleteManufacturerPurchaseMedicine({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ManufacturerPurchaseMedicine {manufacturerPurchaseMedicine.id}{' '}
            Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{manufacturerPurchaseMedicine.id}</td>
            </tr>
            <tr>
              <th>Product id</th>
              <td>{manufacturerPurchaseMedicine.productId}</td>
            </tr>
            <tr>
              <th>Batch</th>
              <td>{manufacturerPurchaseMedicine.batch}</td>
            </tr>
            <tr>
              <th>Paid qty</th>
              <td>{manufacturerPurchaseMedicine.paid_qty}</td>
            </tr>
            <tr>
              <th>Free qty</th>
              <td>{manufacturerPurchaseMedicine.free_qty}</td>
            </tr>
            <tr>
              <th>Pack</th>
              <td>{manufacturerPurchaseMedicine.pack}</td>
            </tr>
            <tr>
              <th>Exp</th>
              <td>{timeTag(manufacturerPurchaseMedicine.exp)}</td>
            </tr>
            <tr>
              <th>Mrp</th>
              <td>{manufacturerPurchaseMedicine.mrp}</td>
            </tr>
            <tr>
              <th>Rate</th>
              <td>{manufacturerPurchaseMedicine.rate}</td>
            </tr>
            <tr>
              <th>Dis</th>
              <td>{manufacturerPurchaseMedicine.dis}</td>
            </tr>
            <tr>
              <th>Sgst</th>
              <td>{manufacturerPurchaseMedicine.sgst}</td>
            </tr>
            <tr>
              <th>Cgst</th>
              <td>{manufacturerPurchaseMedicine.cgst}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{manufacturerPurchaseMedicine.amount}</td>
            </tr>
            <tr>
              <th>Net amount</th>
              <td>{manufacturerPurchaseMedicine.net_amount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(manufacturerPurchaseMedicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(manufacturerPurchaseMedicine.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editManufacturerPurchaseMedicine({
            id: manufacturerPurchaseMedicine.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(manufacturerPurchaseMedicine.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ManufacturerPurchaseMedicine
