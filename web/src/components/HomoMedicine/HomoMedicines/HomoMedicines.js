import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/HomoMedicine/HomoMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { useState, useEffect } from 'react'


const DELETE_HOMO_MEDICINE_MUTATION = gql`
  mutation DeleteHomoMedicineMutation($id: Int!) {
    deleteHomoMedicine(id: $id) {
      id
    }
  }
`

const HomoMedicinesList = ({ homoMedicines }) => {
  const [potency, setPotency] = useState(['Q', '1x', '3x', '6x', '12x', '30c', '200', '1M', '10M', '50M', "CM"]);

  const [search_data, setSearch_data] = useState(homoMedicines)

  useEffect(() => {
    setSearch_data(homoMedicines)

  }, [homoMedicines])

  console.log(homoMedicines)
  const [rows_count, setRows_count] = useState(homoMedicines.length <= 5 ? 5 : 100)



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

  const change = (search) => {
    const search_val = search.target.value

    let filterData = homoMedicines.filter((val) => {
      return (
        val.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 100)
    setSearch_data(filterData)
  }

  const columns = [
    {
      headerClassName: 'text-left',
      Header: 'SL. No',
      // accessor: 'id',
      Cell: ({ index }) => (
        index + 1
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'name',
    },
    {
      headerClassName: 'text-left',
      Header: 'No',
      accessor: 'no',
    },
    {
      headerClassName: 'text-left',
      Header: 'Potency',
      Cell: ({ index,original }) => (
        <div className='flex space-x-2'>
        {
          original.extra.checkedItems.map((item, index) => {
            if(!item){
              return
            }

            return (
              <div>
               [ {item} ]
              </div>
            )
          })
        }
      </div>
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.homoMedicine({ id: original.id })}
            title={'Show homoMedicine ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          <Link
            to={routes.editHomoMedicine({ id: original.id })}
            title={'Edit homoMedicine ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete homoMedicine ' + original.id}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => onDeleteClick(original.id)}
          >
            Delete
          </button>
        </nav>
      ),
    },
  ]

  return (
    <>
      <SearchTable
        change={change}
        placeholder={"Search By Typing Medicine Name"}
        columns={columns}
        rows_count={rows_count}
        search_data={search_data}
      />


    </>
  )
}

export default HomoMedicinesList
