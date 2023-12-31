import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const HomoMedicineForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.homoMedicine?.id)
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
          defaultValue={props.homoMedicine?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          No
        </Label>

        <TextField
          name="no"
          defaultValue={props.homoMedicine?.no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="no" className="rw-field-error" />

        <Label
          name="potency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Potency
        </Label>

        <TextField
          name="potency"
          defaultValue={props.homoMedicine?.potency}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="potency" className="rw-field-error" />


        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default HomoMedicineForm
