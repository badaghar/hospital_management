import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const IpdInvestigationForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.ipdInvestigation?.id)
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
          name="lab_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lab name
        </Label>

        <TextField
          name="lab_name"
          defaultValue={props.ipdInvestigation?.lab_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="lab_name" className="rw-field-error" />

        <Label
          name="isWaiting"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is waiting
        </Label>

        <CheckboxField
          name="isWaiting"
          defaultChecked={props.ipdInvestigation?.isWaiting}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isWaiting" className="rw-field-error" />

        <Label
          name="test_list"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Test list
        </Label>

        <TextAreaField
          name="test_list"
          defaultValue={JSON.stringify(props.ipdInvestigation?.test_list)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="test_list" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.ipdInvestigation?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.ipdInvestigation?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" />

        <Label
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.ipdInvestigation?.ipdId}
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

export default IpdInvestigationForm
