import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
function convertObjectValuesToUpper(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // throw new Error('Input must be an object.');
    return {}
  }

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim().toUpperCase();
    }
  }

  return obj;
}


const LabForm = (props) => {
  const onSubmit = (data) => {
    data = convertObjectValuesToUpper(data)
    props.onSave(data, props?.lab?.id)
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
          defaultValue={props.lab?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="phone_no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone no
        </Label>

        <TextField
          name="phone_no"
          defaultValue={props.lab?.phone_no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phone_no" className="rw-field-error" />

        <Label
          name="Address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="Address"
          defaultValue={props.lab?.Address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="Address" className="rw-field-error" />



        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LabForm
