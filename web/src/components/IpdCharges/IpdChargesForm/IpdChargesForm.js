import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const IpdChargesForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipdCharges?.id)
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
          name="charge_type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Charge type
        </Label>

        <TextField
          name="charge_type"
          defaultValue={props.ipdCharges?.charge_type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="charge_type" className="rw-field-error" />

        <Label
          name="charge"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Charge
        </Label>

        <TextField
          name="charge"
          defaultValue={props.ipdCharges?.charge}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="charge" className="rw-field-error" />

        <Label
          name="quantity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Quantity
        </Label>

        <NumberField
          name="quantity"
          defaultValue={props.ipdCharges?.quantity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="quantity" className="rw-field-error" />

        <Label
          name="total"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Total
        </Label>

        <TextField
          name="total"
          defaultValue={props.ipdCharges?.total}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="total" className="rw-field-error" />

        <Label
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.ipdCharges?.ipdId}
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

export default IpdChargesForm
