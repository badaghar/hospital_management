import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const IpdPaymentForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipdPayment?.id)
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
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.ipdPayment?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="payment_mode"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Payment mode
        </Label>

        <TextField
          name="payment_mode"
          defaultValue={props.ipdPayment?.payment_mode}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="payment_mode" className="rw-field-error" />

        <Label
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.ipdPayment?.ipdId}
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

export default IpdPaymentForm
