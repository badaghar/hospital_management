import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/Product/ProductsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

const ProductsList = ({ products }) => {
  const [search_data, setSearch_data] = useState(products)
  const [rows_count, setRows_count] = useState(products.length <= 5 ? 5 : 1000)
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success('Product deleted')
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
    if (confirm('Are you sure you want to delete product ' + id + '?')) {
      deleteProduct({ variables: { id } })
    }
  }
  const change = (search)=>{
    const search_val = search.target.value

    let filterData = products.filter((val) => {
      return (
        val.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 1000)
    setSearch_data(filterData)
  }
  const columns = [
    {
      headerClassName: 'text-left',
     Header:  'SL. No',
     // accessor: 'id',
           Cell: ({index}) => (
           index+1
       )
   },
    {
       headerClassName: 'text-left',
      Header:  'Name',
      accessor: 'name',
    },
    {
       headerClassName: 'text-left',
      Header:  'Code Name',
      accessor: 'code_name',
    },

    {
       headerClassName: 'text-left',
      Header:  'Manufacturer Name',
      accessor: 'mid.name',
    },


    {
       headerClassName: 'text-left',
      Header:  'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
        <Link
          to={routes.product({ id: original.id })}
          title={'Show product ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          Show
        </Link>
        <Link
          to={routes.editProduct({ id: original.id })}
          title={'Edit product ' + original.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        {/* <button
          type="button"
          title={'Delete product ' + product.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(product.id)}
        >
          Delete
        </button> */}
      </nav>
      ),
    },
  ]

  return (

    <>
            <SearchTable
    change={change}
    placeholder={"Search By Typing Product Name"}
    columns={columns}
    rows_count={rows_count}
    search_data={search_data}
    />


    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Name</th>
    //         <th>Manufacturer Name</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {products.map((product) => (
    //         <tr key={product.id}>
    //           <td>{truncate(product.id)}</td>
    //           <td>{truncate(product.name)}</td>
    //           <td>{truncate(product.mid.name)}</td>
    //           <td>{timeTag(product.created_at)}</td>
    //           <td>{timeTag(product.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.product({ id: product.id })}
    //                 title={'Show product ' + product.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editProduct({ id: product.id })}
    //                 title={'Edit product ' + product.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               {/* <button
    //                 type="button"
    //                 title={'Delete product ' + product.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(product.id)}
    //               >
    //                 Delete
    //               </button> */}
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default ProductsList
