import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const DistributerForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.distributer?.id)
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
          defaultValue={props.distributer?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="phoneNo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone no
        </Label>

        <TextField
          name="phoneNo"
          defaultValue={props.distributer?.phoneNo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phoneNo" className="rw-field-error" />

        <Label
          name="gstNo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gst no
        </Label>

        <TextField
          name="gstNo"
          defaultValue={props.distributer?.gstNo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="gstNo" className="rw-field-error" />

        <Label
          name="dlNo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dl no
        </Label>

        <TextField
          name="dlNo"
          defaultValue={props.distributer?.dlNo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="dlNo" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DistributerForm
