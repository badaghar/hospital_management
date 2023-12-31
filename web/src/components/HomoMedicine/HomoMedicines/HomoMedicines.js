import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/HomoMedicine/HomoMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_HOMO_MEDICINE_MUTATION = gql`
  mutation DeleteHomoMedicineMutation($id: Int!) {
    deleteHomoMedicine(id: $id) {
      id
    }
  }
`

const HomoMedicinesList = ({ homoMedicines }) => {
  const [deleteHomoMedicine] = useMutation(DELETE_HOMO_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('HomoMedicine deleted')
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
    if (confirm('Are you sure you want to delete homoMedicine ' + id + '?')) {
      deleteHomoMedicine({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>No</th>
            <th>Potency</th>
            <th>Created at</th>
            <th>Updated at</th>
            {/* <th>Extra</th> */}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {homoMedicines.map((homoMedicine) => (
            <tr key={homoMedicine.id}>
              <td>{truncate(homoMedicine.id)}</td>
              <td>{truncate(homoMedicine.name)}</td>
              <td>{truncate(homoMedicine.no)}</td>
              <td>{truncate(homoMedicine.potency)}</td>
              <td>{timeTag(homoMedicine.created_at)}</td>
              <td>{timeTag(homoMedicine.updated_at)}</td>
              {/* <td>{jsonTruncate(homoMedicine.extra)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.homoMedicine({ id: homoMedicine.id })}
                    title={'Show homoMedicine ' + homoMedicine.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editHomoMedicine({ id: homoMedicine.id })}
                    title={'Edit homoMedicine ' + homoMedicine.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete homoMedicine ' + homoMedicine.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(homoMedicine.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HomoMedicinesList
