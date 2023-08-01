
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
  useForm,
} from '@redwoodjs/forms'
import { toast } from "@redwoodjs/web/dist/toast"

import { Link, navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query FindPharmacyPaymentBodyQuery($id: Int!) {
    paymentPurchaseMedicine(id: $id){
      id
      purchaseMedicine{
        id
        invoiceNo
      }
      total
      balance
      paid
      remark
      method
    }
  }
`
const UPDATE_PAYMENT_PURCHASE_MEDICINE_MUTATION = gql`
  mutation UpdatePaymentPurchaseMedicineMutation(
    $id: Int!
    $input: UpdatePaymentPurchaseMedicineInput!
  ) {
    updatePaymentPurchaseMedicine(id: $id, input: $input) {
      id
      purchaseMedicineId
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
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>

  Select The Bill Number

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ paymentPurchaseMedicine }) => {
  const formMethods = useForm();

  const { reset } = formMethods;

  const [updatePaymentPurchaseMedicine, { loading, error }] = useMutation(
    UPDATE_PAYMENT_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Payment Completed Successfully')
        navigate(routes.medicinePayment())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {

    try {
      // const balance = parseFloat(paymentPurchaseMedicine.balance) - parseFloat(data['paid'])
      // const paid = parseFloat(paymentPurchaseMedicine.paid) + parseFloat(data['paid'])
      if (paymentPurchaseMedicine.balance == 0) {
        // throw new Error("this is an error")
        toast.success('Payment Already Completed')
        return

      }
      const obj = {
        balance: 0,
        paid: paymentPurchaseMedicine.total,
        remark: data['remark'],
        method: data['method']

      }
      updatePaymentPurchaseMedicine({ variables: { id:paymentPurchaseMedicine.id, input:obj } })
      reset()
    } catch (error) {
      console.log(error)
        toast.error("Invalid Amount")
    }

  }


  const isPaid = ( ) =>{

    if(paymentPurchaseMedicine.balance == 0){
      return 'PAYMENT COMPLETED'
    }
    else{
      return 'SUBMIT PAYMENT'
    }

  }


  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <span>Invoice No :- {paymentPurchaseMedicine.purchaseMedicine.invoiceNo}</span>
        <span>Total :- {paymentPurchaseMedicine.total}</span>
        <span>Balance :- {paymentPurchaseMedicine.balance}</span>
        <span>Paid :- {paymentPurchaseMedicine.paid}</span>
        <span> Payment Method :- {paymentPurchaseMedicine.method || "No Payment Done Yet"}</span>
        <span> Payment Remark :- {paymentPurchaseMedicine.remark || "No Payment Done Yet"}</span>
        <nav className="rw-button-group">
          <Link
            to={routes.purchaseMedicine({ id: paymentPurchaseMedicine.purchaseMedicine.id })}
            className="rw-button rw-button-blue"
          >
            Show Bill Details
          </Link>

        </nav>
      </div>
      <div className="flex flex-col items-center bg-gray-900 text-white mx-40 p-5 rounded-full">
        <div className="">
          <span>Pay Bill</span>
        </div>
        <div className="justify-items-start">
          <Form onSubmit={onSubmit} formMethods={formMethods} >

            <div className='items-center mt-3  gap-x-4 hidden'>


              <Label
                name="paid"
                className="rw-label mt-0"
                errorClassName="rw-label mt-0 rw-label-error"
                // defaultValue={paymentPurchaseMedicine.total}
              >
                Pay Amount
              </Label>
              <div className="flex">


                <TextField
                  name="paid"
                  className="rw-input mt-0"
                  // defaultValue={parseFloat(paymentPurchaseMedicine.total)}
                  defaultValue={parseFloat(paymentPurchaseMedicine.total)}
                  errorClassName="rw-input mt-0 rw-input-error"
                  validation={{ valueAsNumber: true, required: true }}
                />
              </div>

              <FieldError name="paid" className="rw-field-error mt-0" />
            </div>

            <div className=' items-center mt-3  gap-x-4 hidden'>

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
            <div className={` items-center mt-3  gap-x-4 ${isPaid()=='PAYMENT COMPLETED' && 'hidden'}`}>

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
                {
                  isPaid()
                }
              </Submit>
            </div>
          </Form>
        </div>

      </div>


    </div>
  )
}
