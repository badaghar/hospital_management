import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const LabPriceListForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.labPriceList?.id)
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
          name="test_list"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Test list
        </Label>

        <TextAreaField
          name="test_list"
          defaultValue={JSON.stringify(props.labPriceList?.test_list)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="test_list" className="rw-field-error" />

        <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.labPriceList?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" />

        <Label
          name="labId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lab id
        </Label>

        <NumberField
          name="labId"
          defaultValue={props.labPriceList?.labId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="labId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LabPriceListForm
