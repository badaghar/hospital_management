import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/SaleMedicine/SaleMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_SALE_MEDICINE_MUTATION = gql`
  mutation DeleteSaleMedicineMutation($id: Int!) {
    deleteSaleMedicine(id: $id) {
      id
    }
  }
`

const SaleMedicinesList = ({ saleMedicines }) => {
  const [deleteSaleMedicine] = useMutation(DELETE_SALE_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('SaleMedicine deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete saleMedicine ' + id + '?')) {
      deleteSaleMedicine({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Bill no</th>
            <th>Date</th>
            {/* <th>Medicine</th> */}
            <th>Total</th>
            <th>Discount</th>
            <th>Sgst</th>
            <th>Cgst</th>
            <th>Grand total</th>
            {/* <th>Created at</th> */}
            {/* <th>Updated at</th> */}
            {/* <th>Patient id</th> */}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {saleMedicines.map((saleMedicine) => (
            <tr key={saleMedicine.id}>
              {/* <td>{truncate(saleMedicine.id)}</td> */}
              <td>{truncate(saleMedicine.billNo)}</td>
              <td>{timeTag(saleMedicine.date)}</td>
              {/* <td>{jsonTruncate(saleMedicine.medicine)}</td> */}
              <td>{truncate(saleMedicine.total)}</td>
              <td>{truncate(saleMedicine.discount)}</td>
              <td>{truncate(saleMedicine.sgst)}</td>
              <td>{truncate(saleMedicine.cgst)}</td>
              <td>{truncate(saleMedicine.grand_total)}</td>
              {/* <td>{timeTag(saleMedicine.created_at)}</td> */}
              {/* <td>{timeTag(saleMedicine.updated_at)}</td> */}
              {/* <td>{truncate(saleMedicine.patientId)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.saleMedicine({ id: saleMedicine.id })}
                    title={'Show saleMedicine ' + saleMedicine.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.viewSaleMedicine({ id: saleMedicine.id })}
                    title={'Print saleMedicine ' + saleMedicine.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Print
                  </Link>
                  {/* <Link
                    to={routes.editSaleMedicine({ id: saleMedicine.id })}
                    title={'Edit saleMedicine ' + saleMedicine.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete saleMedicine ' + saleMedicine.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(saleMedicine.id)}
                  >
                    Delete
                  </button> */}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SaleMedicinesList
