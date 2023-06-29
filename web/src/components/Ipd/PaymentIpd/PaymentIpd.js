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
import { Link, routes,navigate } from '@redwoodjs/router'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import React from 'react'
import Select from 'react-select'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/Ipd/IpdCell'



const CREATE_IPD_PAYMENT_MUTATION = gql`
  mutation CreateIpdPaymentMutation($input: CreateIpdPaymentInput!) {
    createIpdPayment(input: $input) {
      id
    }
  }
`



const PaymentIpd = ({ totalAmount, ipd }) => {
  const [payment,setPayment] = useState('')
  const [advancePayment,setAdvancePayment] = useState(0)

  const [createIpdPayment, { loading, error }] = useMutation(
    CREATE_IPD_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Payment Done Successfully')
        navigate(routes.ipd({id:ipd.id}))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY,  variables: {
        id: ipd.id,
      }, }],
      awaitRefetchQueries: true,
    }
  )

  const [paymentOption,setPaymentOption] = useState([
    {value:'cheque',label:'cheque'},{value:'cash',label:'cash'}
  ])

  const changePayment = (item) =>{
    if(!item)
    {
      setPayment('')
      return
    }
    // console.log(item.value)
    setPayment(item.value)
  }


  const onSave = (input) => {
    if(payment=='' || advancePayment==0)
    {
      toast.error('Plz enter all the details')
      return
    }
    let data = {
      'amount':parseFloat(advancePayment),
      'payment_mode':payment,
      'ipdId':ipd.id
    }
    createIpdPayment({ variables: { input:data } })
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
          <span>Balance Amount To be Paid is :- {totalAmount - ipd.paid_amount}</span>
        </div>

        <div className=" grid grid-cols-3 grid-flow-row gap-x-2 gap-y-2">

          <div className="flex col-span-1 justify-center">Payment Time</div>
          <div className="flex col-span-1 justify-center">Amount</div>
          <div className="flex col-span-1 justify-center">Payment Mode</div>

          {
            ipd.IpdPayment.map((item) => {
              return (
                    <>
          <div className="flex col-span-1 justify-center">{item.created_at}</div>
          <div className="flex col-span-1 justify-center">{item.amount}</div>
          <div className="flex col-span-1 justify-center">{item.payment_mode}</div>



                    </>
              )
            })
          }
        </div>

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
          <Select options={paymentOption} onChange={changePayment} isClearable={true} required  />
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
              onChange={(e)=>setAdvancePayment(e.target.value)}
              className="rw-input mt-0"
              errorClassName="rw-input mt-0 rw-input-error"
              validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="amount1" className="rw-field-error mt-0" />
        </div>
        <div className="rw-button-group">
          <Submit  className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>


        </div>
        </Form>

      </div>
    </div>
  )
}

export default PaymentIpd
