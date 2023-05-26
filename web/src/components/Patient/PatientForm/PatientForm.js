import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PatientForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.patient?.id)
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.patient?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="age"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Age
        </Label>

        <NumberField
          name="age"
          defaultValue={props.patient?.age}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="age" className="rw-field-error" />

        <Label
          name="phone_no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone no
        </Label>

        <TextField
          name="phone_no"
          defaultValue={props.patient?.phone_no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phone_no" className="rw-field-error" />

        <Label
          name="gender"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gender
        </Label>

        <TextField
          name="gender"
          defaultValue={props.patient?.gender}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="gender" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.patient?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="doctorFeeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Doctor fee id
        </Label>

        <NumberField
          name="doctorFeeId"
          defaultValue={props.patient?.doctorFeeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="doctorFeeId" className="rw-field-error" />

        <Label
          name="date_of_admission"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date of admission
        </Label>

        <DatetimeLocalField
          name="date_of_admission"
          defaultValue={formatDatetime(props.patient?.date_of_admission)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="date_of_admission" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PatientForm
