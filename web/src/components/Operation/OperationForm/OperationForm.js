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

const OperationForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.operation?.id)
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
          name="operation_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Operation name
        </Label>

        <TextField
          name="operation_name"
          defaultValue={props.operation?.operation_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="operation_name" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.operation?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="consultant_doctor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Consultant doctor
        </Label>

        <TextField
          name="consultant_doctor"
          defaultValue={props.operation?.consultant_doctor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="consultant_doctor" className="rw-field-error" />

        <Label
          name="remark"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Remark
        </Label>

        <TextField
          name="remark"
          defaultValue={props.operation?.remark}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="remark" className="rw-field-error" />

        <Label
          name="result"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Result
        </Label>

        <TextField
          name="result"
          defaultValue={props.operation?.result}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="result" className="rw-field-error" />

        <Label
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.operation?.ipdId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ipdId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OperationForm
