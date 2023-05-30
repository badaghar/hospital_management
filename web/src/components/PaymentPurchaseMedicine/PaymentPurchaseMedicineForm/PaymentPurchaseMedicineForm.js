import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const PaymentPurchaseMedicineForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.paymentPurchaseMedicine?.id)
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
          name="purchaseMedicineId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Purchase medicine id
        </Label>

        <NumberField
          name="purchaseMedicineId"
          defaultValue={props.paymentPurchaseMedicine?.purchaseMedicineId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="purchaseMedicineId" className="rw-field-error" />

        <Label
          name="total"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Total
        </Label>

        <TextField
          name="total"
          defaultValue={props.paymentPurchaseMedicine?.total}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="total" className="rw-field-error" />

        <Label
          name="balance"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Balance
        </Label>

        <TextField
          name="balance"
          defaultValue={props.paymentPurchaseMedicine?.balance}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="balance" className="rw-field-error" />

        <Label
          name="paid"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Paid
        </Label>

        <TextField
          name="paid"
          defaultValue={props.paymentPurchaseMedicine?.paid}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="paid" className="rw-field-error" />

        <Label
          name="method"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Method
        </Label>

        <TextField
          name="method"
          defaultValue={props.paymentPurchaseMedicine?.method}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="method" className="rw-field-error" />

        <Label
          name="remark"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Remark
        </Label>

        <TextField
          name="remark"
          defaultValue={props.paymentPurchaseMedicine?.remark}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="remark" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PaymentPurchaseMedicineForm
