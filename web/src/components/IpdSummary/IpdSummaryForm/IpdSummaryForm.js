import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const IpdSummaryForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipdSummary?.id)
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
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.ipdSummary?.ipdId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ipdId" className="rw-field-error" />

        <Label
          name="summary"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Summary
        </Label>

        <TextAreaField
          name="summary"
          defaultValue={JSON.stringify(props.ipdSummary?.summary)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="summary" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IpdSummaryForm
