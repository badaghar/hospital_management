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

const IpdForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipd?.id)
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
          name="consultant_doctor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Consultant doctor
        </Label>

        <TextField
          name="consultant_doctor"
          defaultValue={props.ipd?.consultant_doctor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="consultant_doctor" className="rw-field-error" />

        <Label
          name="date_of_admission"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date of admission
        </Label>

        <DatetimeLocalField
          name="date_of_admission"
          defaultValue={formatDatetime(props.ipd?.date_of_admission)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date_of_admission" className="rw-field-error" />

        <Label
          name="paid_amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Paid amount
        </Label>

        <TextField
          name="paid_amount"
          defaultValue={props.ipd?.paid_amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="paid_amount" className="rw-field-error" />

        <Label
          name="patientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient id
        </Label>

        <NumberField
          name="patientId"
          defaultValue={props.ipd?.patientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="patientId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IpdForm
