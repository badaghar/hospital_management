import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
  DateField,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Link, routes, navigate } from '@redwoodjs/router'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import React from 'react'
import Select from 'react-select'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/Ipd/IpdCell'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'



const CREATE_IPD_PAYMENT_MUTATION = gql`
  mutation CreateIpdPaymentMutation($input: CreateIpdPaymentInput!) {
    createIpdPayment(input: $input) {
      id
    }
  }
`
const DELETE_IPD_PAYMENT_MUTATION = gql`
  mutation DeleteIpdPaymentMutation($id: Int!,$amount: Int!,$ipdId: Int!) {
    deleteIpdPayment(id: $id,amount: $amount,ipdId: $ipdId) {
      id
      payment_mode
    }
  }
`

const timeFormate = (time) => {
  const newdate = new Date(time)
  const d = newdate.toLocaleString()
  time = d
  return time
}



const PaymentIpd = ({ totalAmount, ipd }) => {
  const [payment, setPayment] = useState('')
  const [advancePayment, setAdvancePayment] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [gst,setGst] = useState(0)
  const [disAmt, setDisAmt] = useState(0)
  const [gstAmt,setGstAmount] = useState(0)
  const [isIncludeGst,setIsIncludeGst] = useState(true)

  const [deleteIpdPayment] = useMutation(DELETE_IPD_PAYMENT_MUTATION, {
    onCompleted: (data) => {
      toast.success('IpdPayment deleted')
      if(
        data.deleteIpdPayment.payment_mode=='gst'
        )
        {
        setIsIncludeGst(true)
        setGstAmount(0)

      }

    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{
      query: QUERY, variables: {
        id: ipd.id,
      },
    }],
    awaitRefetchQueries: true,
  })

  const [createIpdPayment, { loading, error }] = useMutation(
    CREATE_IPD_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Payment Done Successfully')
        // setPayment('')
        setAdvancePayment(0)
        setDiscountAmount(0)
        setGst(0)
        navigate(routes.ipd({ id: ipd.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{
        query: QUERY, variables: {
          id: ipd.id,
        },
      }],
      awaitRefetchQueries: true,
    }
  )

  const [paymentOption, setPaymentOption] = useState([
    { value: 'cheque', label: 'cheque' }, { value: 'cash', label: 'cash' }
  ])

  const changePayment = (item) => {
    if (!item) {
      setPayment('')
      return
    }
    // console.log(item.value)
    setPayment(item.value)
  }


  const onSave = (input) => {
    if (payment == '' || advancePayment == 0) {
      toast.error('Plz enter all the details')
      return
    }
    let data = {
      'amount': parseFloat(advancePayment),
      'payment_mode': payment,
      'ipdId': ipd.id
    }

    createIpdPayment({ variables: { input: data } })
  }
  const onDisc = (input) => {
    if (discountAmount == 0) {
      toast.error('Plz enter Discount Amount')
      return
    }
    let data = {
      'amount': parseFloat(discountAmount) * -1,
      'payment_mode': 'disc',
      'ipdId': ipd.id

    }
    createIpdPayment({ variables: { input: data } })
  }

  const onGst = (input) => {
    if (gst == 0) {
      toast.error('Plz enter Discount Amount')
      return
    }
    let g = (totalAmount+disAmt)*gst/100
    let data = {
      'amount': g ,
      'payment_mode': 'gst',
      'ipdId': ipd.id

    }
    createIpdPayment({ variables: { input: data } })


  }
  const onDeleteClick = (id,amount) => {

    if (confirm('Are you sure you want to delete ipdPayment ' + id + '?')) {
      deleteIpdPayment({ variables: { id,amount,ipdId:ipd.id } })
      // console.log(amount)
    }
  }

  useEffect(() => {
    let dis =0
    console.log('here')
    ipd.IpdPayment.map((item) => {
      if (item.payment_mode == 'disc') {
        dis += item.amount

      }
      if(item.payment_mode == 'gst')
      {
        setIsIncludeGst(false)
        setGstAmount(item.amount)
        console.log(item.amount)
      }
    })
    setDisAmt(dis)


  },[ipd])

  function getPDF(id) {
    return axios.get(
      `/.redwood/functions/downloadOtherCharges?id=` +
      id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = (id) => {
    return getPDF(id) // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        var blobURL = URL.createObjectURL(blob)
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
        toast.success('Download Complete')
      })
      .catch((err) => {
        toast.error('something wrong happened try again')
        console.log(err)
      })
  }


  return (
    <div className="m-3 p-3">
      <div className="shadow-md rounded-md p-3">
        <div className="text-center text-xl uppercase font-bold">
          <h1>Payment</h1>
        </div>

        <div>
          <span>Total Amount To be Paid is :- {totalAmount}</span>
        </div>
        <div>
          <span>Total Amount To be Paid After Discount is :- {totalAmount+disAmt}</span>
        </div>
        <div>
          <span>GST Amount is :- {gstAmt}</span>
        </div>
        <div>
          <span>Total Amount To be Paid with GST is :- {totalAmount+disAmt+gstAmt}</span>
        </div>
        <div>
          <span>Balance Amount To be Paid is :- {totalAmount + disAmt + 2*gstAmt - ipd.paid_amount}</span>
        </div>


        <div className=" grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2">

          <div className="flex col-span-1 justify-center">Payment Time</div>
          <div className="flex col-span-1 justify-center">Amount</div>
          <div className="flex col-span-1 justify-center">Payment Mode</div>
          <div className="flex col-span-1 justify-center">Action</div>

          {
            ipd.IpdPayment.map((item) => {
              // if (item.payment_mode == 'disc') {
              //   <>
              //   </>
              // }
              // else {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{timeFormate(item.created_at)}</div>
                    <div className="flex col-span-1 justify-center">{item.payment_mode == 'disc' ? 'Discount Amount is '+ item.amount*-1 : item.amount}</div>
                    <div className="flex col-span-1 justify-center">{item.payment_mode}</div>

                    {item.payment_mode == 'disc' ?
                       <div className="flex col-span-1 justify-center">        <span className='cursor-pointer text-xl text-red-600'
                       onClick={()=>onDeleteClick(item.id,0)}
                       >
                         <MdDeleteForever />
                       </span></div>

                    :
                    <div className="flex col-span-1 justify-center">        <span className='cursor-pointer text-xl text-red-600'
                    onClick={()=>onDeleteClick(item.id,item.amount)}
                    >
                      <MdDeleteForever />
                    </span></div>}



                  </>
                )
              // }
            })
          }
        </div>


        <Form onSubmit={onDisc}>

          <div>
            <div className='flex items-center mt-3 justify-end gap-x-4 font-bold'>

              <span>Discount Amount </span>
            </div>


            <div className='flex items-center mt-3 justify-end gap-x-4'>

              <Label
                name="amount1"
                className="rw-label mt-0"
                errorClassName="rw-label mt-0 rw-label-error"
              >
                Discount Amount
              </Label>
              <div className="flex">

                <TextField
                  name="amount1"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="rw-input mt-0"
                  errorClassName="rw-input mt-0 rw-input-error"
                  validation={{ valueAsNumber: true, required: true }}
                />
              </div>
              <FieldError name="amount1" className="rw-field-error mt-0" />
            </div>
            <div className="rw-button-group">
              <Submit className="rw-button rw-button-blue">
                Add Discount Amount
              </Submit>
            </div>


          </div>
        </Form>

{isIncludeGst &&
        <Form onSubmit={onGst}>

          <div>
            <div className='flex items-center mt-3 justify-end gap-x-4 font-bold'>

              <span>GST % </span>
            </div>


            <div className='flex items-center mt-3 justify-end gap-x-4'>

              <Label
                name="amount1"
                className="rw-label mt-0"
                errorClassName="rw-label mt-0 rw-label-error"
              >
                GST %
              </Label>
              <div className="flex">

                <TextField
                  name="amount1"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  className="rw-input mt-0"
                  errorClassName="rw-input mt-0 rw-input-error"
                  validation={{ valueAsNumber: true, required: true }}
                />
              </div>
              <FieldError name="amount1" className="rw-field-error mt-0" />
            </div>
            <div className="rw-button-group">
              <Submit className="rw-button rw-button-blue">
                Add GST %
              </Submit>
            </div>


          </div>
        </Form>}



        <Form onSubmit={onSave}>

          <div>
            <div className='flex items-center mt-3 justify-end gap-x-4 font-bold'>

              <span>Pay Amount </span>
            </div>
            <div className='flex items-center mt-3 justify-end gap-x-4'>
              <Label
                name="paymentMode"
                className="rw-label mt-0"
                errorClassName="rw-label mt-0 rw-label-error"
              >
                Payment mode
              </Label>
              <div className="flex">

              </div>
              <Select options={paymentOption} onChange={changePayment} isClearable={true} required />
            </div>

            <div className='flex items-center mt-3 justify-end gap-x-4'>

              <Label
                name="amount1"
                className="rw-label mt-0"
                errorClassName="rw-label mt-0 rw-label-error"
              >
                Payment Amount
              </Label>
              <div className="flex">

                <TextField
                  name="amount1"
                  value={advancePayment}
                  onChange={(e) => setAdvancePayment(e.target.value)}
                  className="rw-input mt-0"
                  errorClassName="rw-input mt-0 rw-input-error"
                  validation={{ valueAsNumber: true, required: true }}
                />
              </div>
              <FieldError name="amount1" className="rw-field-error mt-0" />
            </div>
            <div className="rw-button-group">
              <Submit className="rw-button rw-button-blue">
                Save
              </Submit>
            </div>


          </div>
        </Form>

        <div className="rw-button-group">
              <div className="rw-button rw-button-green" onClick={()=>printPDF(ipd.id)}>
                Print Bill
              </div>
            </div>

      </div>
    </div>
  )
}

export default PaymentIpd
