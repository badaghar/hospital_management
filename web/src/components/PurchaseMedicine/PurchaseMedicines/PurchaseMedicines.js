import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'
import { ReactDialogBox, useEffect } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from "src/auth"


const UPDATE_PAYMENT_PURCHASE_MEDICINE_MUTATION = gql`
  mutation UpdatePaymentPurchaseMedicineMutation(
    $id: Int!
    $input: UpdatePaymentPurchaseMedicineInput!
  ) {
    updatePaymentPurchaseMedicine(id: $id, input: $input) {
      id
      purchaseMedicineId
      purchaseMedicine{
        id
        invoiceNo
      }
      total
      balance
      paid
      method
      remark
      created_at
      updated_at
    }
  }
`


const DELETE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePurchaseMedicineMutation($id: Int!) {
    deletePurchaseMedicine(id: $id) {
      id

    }
  }
`

const PurchaseMedicinesList = ({ purchaseMedicines ,paymentPurchaseMedicines}) => {

  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  const [search_data, setSearch_data] = useState(purchaseMedicines)
  const [rows_count, setRows_count] = useState(purchaseMedicines.length )
  const [paymentIsOPen, setPaymentIsOpen] = useState(false)
  const [paymentAmount,setPaymentAmount] = useState(0)
  const [paymentId,setPaymentId] = useState(0)
  const [deletePurchaseMedicine] = useMutation(
    DELETE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine deleted')
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

  const [updatePaymentPurchaseMedicine, { loading, error }] = useMutation(
    UPDATE_PAYMENT_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: (val) => {
        toast.success('Payment Completed Successfully')
        console.log(val)
        isPaid(val.updatePaymentPurchaseMedicine.purchaseMedicine.invoiceNo)
        // navigate(routes.medicinePayment())
      },
      onError: (error) => {
        toast.error(error.message)
      },

      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete purchaseMedicine ' + id + '?')
    ) {
      deletePurchaseMedicine({ variables: { id } })
    }
  }


  const onPayment = (data) => {
    console.log('data')
    const data1 = paymentPurchaseMedicines.filter((val)=>paymentId==val.purchaseMedicine.invoiceNo)
    // console.log(paymentId)
    const data2 = purchaseMedicines.filter((val)=>data1[0].purchaseMedicine.invoiceNo==val.invoiceNo)

    const balance = 0
    const paid = data2[0]?.grand_total
    const obj = {
      balance: balance,
      paid: paid,
      remark: data['remark'],
      method: data['method']

    }
    updatePaymentPurchaseMedicine({ variables: { id:data1[0].id, input:obj } })
    setPaymentIsOpen(false)


  }

  const isPaid = ( invoiceNo ) =>{
    const data1 = paymentPurchaseMedicines.filter((val)=>invoiceNo==val.purchaseMedicine.invoiceNo)
    if(data1[0]?.balance == 0){
      return 'Paid'
    }
    else{
      return 'Pay'
    }

  }



  // useEffect(()=>{

  // })











  const change = (search) => {
    const search_val = search.target.value

    let filterData = purchaseMedicines.filter((val) => {
      return (
        val.invoiceNo
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) || val.did.name
            .toString()
            .toLowerCase()
            .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length )
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
      Header: 'Invoice No',
      accessor: 'invoiceNo',
    },
    {
      headerClassName: 'text-left',
      Header: 'Distributer Name',
      accessor: 'did.name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Date',
      accessor: 'date',
      Cell: ({ original }) => (
        original.date.split('T00:')[0]
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Total',
      accessor: 'total',
      Cell: ({ original }) => (
        original.total.toFixed(2)
      )

    },

    {
      headerClassName: 'text-left',
      Header: 'Discount',
      accessor: 'discount',
      Cell: ({ original }) => (
        original.discount.toFixed(2)
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'SGST',
      accessor: 'sgst',
      Cell: ({ original }) => (
        original.sgst.toFixed(2)
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'CGST',
      accessor: 'cgst',
      Cell: ({ original }) => (
        original.cgst.toFixed(2)
      )
    },
    {
      headerClassName: 'text-left',
      Header: 'Grand Total',
      accessor: 'grand_total',
      Cell: ({ original }) => (
        original.grand_total.toFixed(2)
      )
    },


    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">

          {hasRole('admin') &&

          <button
            type="button"
            title={'Pay ' + original.id}
            className="rw-button rw-button-small "
            onClick={() => {
              if (isPaid(original.invoiceNo)=='Paid') {
                toast.success('Payment Already Completed')
                return

              }


              setPaymentIsOpen(true)
                      setPaymentAmount(original.grand_total)
                      setPaymentId(original.invoiceNo)
            }}
          >
            {
              isPaid(original.invoiceNo)
            }
          </button>

    }

          <Link
            to={routes.purchaseMedicine({ id: original.id })}
            title={
              'Show purchaseMedicine ' + original.id + ' detail'
            }
            className="rw-button rw-button-small"
          >
            Show
          </Link>


        </nav>
      ),
    },
  ]


  return (

    <>

      {
        paymentIsOPen && (
          <>
            <ReactDialogBox
              closeBox={setPaymentIsOpen.bind(this, false)}
              modalWidth='50%'
              headerBackgroundColor='#000000'
              headerTextColor='white'
              headerHeight='60px'
              closeButtonColor='white'
              bodyBackgroundColor='#2c2c2c'
              bodyTextColor='white'
              bodyHeight='200px'

              headerText={<span className="flex items-end h-14 text-xl">Add Payment Details</span>}

            >

              <Form onSubmit={onPayment}  >

                <div className=' items-center mt-3  gap-x-4  hidden'>


                  <Label
                    name="paid"
                    className="rw-label mt-0"
                    errorClassName="rw-label mt-0 rw-label-error"
                  >
                    Pay Amount
                  </Label>
                  <div className="flex">


                    <TextField
                      name="paid"
                      className="rw-input mt-0"
                      errorClassName="rw-input mt-0 rw-input-error"

                      defaultValue={parseInt(paymentAmount)}
                      // value={parseFloat(paymentAmount)}
                      validation={{ valueAsNumber: true, required: true }}
                    />
                  </div>

                  <FieldError name="paid" className="rw-field-error mt-0" />
                </div>

                <div className=' items-center mt-3  gap-x-4  hidden'>

                  <Label
                    name="method"
                    className="rw-label mt-0"
                    errorClassName="rw-label mt-0 rw-label-error"

                  >
                    Payment Method
                  </Label>
                  <div className="flex">

                    <TextField
                      name="method"
                      className="rw-input mt-0"
                      errorClassName="rw-input mt-0 rw-input-error"
                      defaultValue="cash"
                      validation={{ required: true }}
                    />
                  </div>
                  <FieldError name="method" className="rw-field-error mt-0" />
                </div>
                <div className='flex items-center mt-3  gap-x-4'>

                  <Label
                    name="remark"
                    className="rw-label mt-0"
                    errorClassName="rw-label mt-0 rw-label-error"
                  >
                    Remark
                  </Label>
                  <div className="flex">

                    <TextField
                      name="remark"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{ required: true }}
                    />
                  </div>
                  <FieldError name="remark" className="rw-field-error" />
                </div>

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">
                    Submit Payment
                  </Submit>
                </div>
              </Form>

            </ReactDialogBox>
          </>
        )
      }


      <SearchTable
        change={change}
        placeholder={"Search By Typing Invoice No"}
        columns={columns}
        rows_count={rows_count}
        search_data={search_data}
      />

    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         {/* <th>Id</th> */}
    //         <th>Invoice no</th>
    //         <th>Distributer Name</th>
    //         <th>Date</th>
    //         {/* <th>Medicine</th> */}
    //         <th>Total</th>
    //         <th>Discount</th>
    //         <th>Sgst</th>
    //         <th>Cgst</th>
    //         <th>Grand total</th>
    //         {/* <th>Created at</th>
    //         <th>Updated at</th> */}
    //         <th><Link
    //           to={routes.downloadPurchaseMedicine()}

    //           className="rw-button rw-button-small"
    //         >
    //           Download
    //         </Link></th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {purchaseMedicines.map((purchaseMedicine) => (
    //         <tr key={purchaseMedicine.id}>
    //           {/* <td>{truncate(purchaseMedicine.id)}</td> */}
    //           <td>{truncate(purchaseMedicine.invoiceNo)}</td>
    //           <td>{truncate(purchaseMedicine.did.name)}</td>

    //           <td>{timeTag(purchaseMedicine.date)}</td>
    //           {/* <td>{jsonTruncate(purchaseMedicine.medicine)}</td> */}
    //           <td>{truncate(purchaseMedicine.total)}</td>
    //           <td>{truncate(purchaseMedicine.discount)}</td>
    //           <td>{truncate(purchaseMedicine.sgst)}</td>
    //           <td>{truncate(purchaseMedicine.cgst)}</td>
    //           <td>{truncate(purchaseMedicine.grand_total)}</td>
    //           {/* <td>{timeTag(purchaseMedicine.created_at)}</td>
    //           <td>{timeTag(purchaseMedicine.updated_at)}</td> */}
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.purchaseMedicine({ id: purchaseMedicine.id })}
    //                 title={
    //                   'Show purchaseMedicine ' + purchaseMedicine.id + ' detail'
    //                 }
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>

    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default PurchaseMedicinesList
