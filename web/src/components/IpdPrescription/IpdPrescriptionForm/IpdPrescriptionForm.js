import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const IpdPrescriptionForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipdPrescription?.id)
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
          defaultValue={props.ipdPrescription?.ipdId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ipdId" className="rw-field-error" />

        <Label
          name="medicine"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Medicine
        </Label>

        <TextField
          name="medicine"
          defaultValue={props.ipdPrescription?.medicine}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="medicine" className="rw-field-error" />

        <Label
          name="dosage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dosage
        </Label>

        <TextField
          name="dosage"
          defaultValue={props.ipdPrescription?.dosage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dosage" className="rw-field-error" />

        <Label
          name="timing"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timing
        </Label>

        <TextField
          name="timing"
          defaultValue={props.ipdPrescription?.timing}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="timing" className="rw-field-error" />

        <Label
          name="frequency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Frequency
        </Label>

        <TextField
          name="frequency"
          defaultValue={props.ipdPrescription?.frequency}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="frequency" className="rw-field-error" />

        <Label
          name="duration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Duration
        </Label>

        <TextField
          name="duration"
          defaultValue={props.ipdPrescription?.duration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="duration" className="rw-field-error" />

        <Label
          name="note"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Note
        </Label>

        <TextField
          name="note"
          defaultValue={props.ipdPrescription?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="note" className="rw-field-error" />

        <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.ipdPrescription?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IpdPrescriptionForm
