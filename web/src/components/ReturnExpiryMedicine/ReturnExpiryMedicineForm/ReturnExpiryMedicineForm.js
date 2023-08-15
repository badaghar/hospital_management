import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextAreaField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const ReturnExpiryMedicineForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.returnExpiryMedicine?.id)
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
          name="distributerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Distributer id
        </Label>

        <NumberField
          name="distributerId"
          defaultValue={props.returnExpiryMedicine?.distributerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="distributerId" className="rw-field-error" />

        <Label
          name="medicine"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Medicine
        </Label>

        <TextAreaField
          name="medicine"
          defaultValue={JSON.stringify(props.returnExpiryMedicine?.medicine)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="medicine" className="rw-field-error" />

        <Label
          name="return_med"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Return med
        </Label>

        <CheckboxField
          name="return_med"
          defaultChecked={props.returnExpiryMedicine?.return_med}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="return_med" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ReturnExpiryMedicineForm
