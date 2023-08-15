import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ReturnExpiryMedicine/ReturnExpiryMedicinesCell'
import {
  checkboxInputTag,
  jsonTruncate,
  timeTag,
  truncate,
} from 'src/lib/formatters'

const DELETE_RETURN_EXPIRY_MEDICINE_MUTATION = gql`
  mutation DeleteReturnExpiryMedicineMutation($id: Int!) {
    deleteReturnExpiryMedicine(id: $id) {
      id
    }
  }
`

const ReturnExpiryMedicinesList = ({ returnExpiryMedicines }) => {
  const [deleteReturnExpiryMedicine] = useMutation(
    DELETE_RETURN_EXPIRY_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReturnExpiryMedicine deleted')
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
      confirm(
        'Are you sure you want to delete returnExpiryMedicine ' + id + '?'
      )
    ) {
      deleteReturnExpiryMedicine({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {/* <th>Id</th>
            <th>Distributer id</th> */}
            <th>Medicine</th>
            <th>Return med</th>
            {/* <th>Created at</th>
            <th>Updated at</th> */}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {returnExpiryMedicines.map((returnExpiryMedicine) => (
            <tr key={returnExpiryMedicine.id}>
              {/* <td>{truncate(returnExpiryMedicine.id)}</td>
              <td>{truncate(returnExpiryMedicine.distributerId)}</td> */}
              <td>{jsonTruncate(returnExpiryMedicine.medicine)}</td>
              <td>{checkboxInputTag(returnExpiryMedicine.return_med)}</td>
              {/* <td>{timeTag(returnExpiryMedicine.created_at)}</td>
              <td>{timeTag(returnExpiryMedicine.updated_at)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.returnExpiryMedicine({
                      id: returnExpiryMedicine.id,
                    })}
                    title={
                      'Show returnExpiryMedicine ' +
                      returnExpiryMedicine.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  {/* <Link
                    to={routes.editReturnExpiryMedicine({
                      id: returnExpiryMedicine.id,
                    })}
                    title={
                      'Edit returnExpiryMedicine ' + returnExpiryMedicine.id
                    }
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete returnExpiryMedicine ' + returnExpiryMedicine.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(returnExpiryMedicine.id)}
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

export default ReturnExpiryMedicinesList
