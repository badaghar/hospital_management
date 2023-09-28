import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import Select from 'react-select'
import { useState, useEffect } from 'react'

const IpdOperationPaymentForm = (props) => {
  const [objOperation, setObjOperation] = useState([])
  const [objIpd, setObjIpd] = useState([])
  const [operationName, setOperationName] = useState('')
  const [ipdId, setIpdId] = useState('')
  const [date,setDate] = useState(new Date())


  const onSubmit = (data) => {
    data['operation_name'] = operationName
    data['ipdId'] = ipdId
    data['extra'] = {date:new Date(date)}
    console.log(data)
    props.onSave(data, props?.ipdOperationPayment?.id)
  }

  useEffect(() => {

    // if (item.charge_type) {
    //   setlabChargeType({ value: item.name, label: item.name })
    // }
    // setAmount(item.amount)

    const obj = props.operations.map((char) => {
      const ob = { value: char.name, label: char.name, name: char.name }
      return ob
    })
    const obj1 = props.ipds.map((char) => {
      const ob = { value: char.patient.name, label: char.patient.name + 'IPD ID - ' + char.id, id: char.id }
      return ob
    })
    setObjOperation(obj)
    setObjIpd(obj1)
    // console.log(item)
  }, [props.operations])

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />



        <div className="flex  justify-center p-3 space-x-4 items-center">

          <div className='font-bold'>
            <span>Operation Name</span>
          </div>

          <Select options={objOperation} isClearable={true} required className='flex-1' onChange={(e) => setOperationName(e.name)}
          />
        </div>

        {/* <Label
          name="operation_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Operation name
        </Label>

        <TextField
          name="operation_name"
          defaultValue={props.ipdOperationPayment?.operation_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="operation_name" className="rw-field-error" /> */}

        <div className='flex space-x-4 justify-center'>


        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.ipdOperationPayment?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />
        </div>
        <div className="flex  justify-center p-3 space-x-4 items-center">

          <div className='font-bold'>
            <span>Patient Name & Ipd ID</span>
          </div>

          <Select options={objIpd} isClearable={true} required className='flex-1'

            onChange={(e) => setIpdId(e.id)}
          />
        </div>
        <div className="flex  justify-center p-3 space-x-4 items-center">

          <div className='font-bold'>
            <span>Operation Date/Time</span>
          </div>

          <input type="datetime-local" required onChange={(e)=>setDate(e.target.value)} value={date} />
        </div>



        {/* <Label
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.ipdOperationPayment?.ipdId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ipdId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IpdOperationPaymentForm
