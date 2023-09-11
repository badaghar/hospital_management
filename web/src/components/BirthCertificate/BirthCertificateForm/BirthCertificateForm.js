import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const BirthCertificateForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.birthCertificate?.id)
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
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        {/* Radio buttons */}
        <div className='flex space-x-5'>


          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                name="type"
                value="option1"
                defaultChecked={props.birthCertificate?.type === "option1"}
              />
              <span className="ml-2">Birth Certificate</span>
            </label>
          </div>

          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                name="type"
                value="2"
                defaultChecked={props.birthCertificate?.type === "option2"}
              />
              <span className="ml-2">Dead Certificate</span>
            </label>
          </div>

        </div>

        <FieldError name="type" className="rw-field-error" />


        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.birthCertificate?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="birth_date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Birth date
        </Label>

        <DatetimeLocalField
          name="birth_date"
          defaultValue={formatDatetime(props.birthCertificate?.birth_date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="birth_date" className="rw-field-error" />

        <Label
          name="weight"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Weight
        </Label>

        <TextField
          name="weight"
          defaultValue={props.birthCertificate?.weight}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="weight" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <NumberField
          name="type"
          defaultValue={props.birthCertificate?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        {/* <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.birthCertificate?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BirthCertificateForm
