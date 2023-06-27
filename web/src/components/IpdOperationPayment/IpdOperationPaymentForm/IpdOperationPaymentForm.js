import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const IpdOperationPaymentForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipdOperationPayment?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
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

        <FieldError name="operation_name" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.ipdOperationPayment?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="operation_doctor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Operation doctor
        </Label>

        <TextField
          name="operation_doctor"
          defaultValue={props.ipdOperationPayment?.operation_doctor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="operation_doctor" className="rw-field-error" />

        <Label
          name="remark"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Remark
        </Label>

        <TextField
          name="remark"
          defaultValue={props.ipdOperationPayment?.remark}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="remark" className="rw-field-error" />

        <Label
          name="result"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Result
        </Label>

        <TextField
          name="result"
          defaultValue={props.ipdOperationPayment?.result}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="result" className="rw-field-error" />

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

        <Label
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

        <FieldError name="ipdId" className="rw-field-error" />

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
