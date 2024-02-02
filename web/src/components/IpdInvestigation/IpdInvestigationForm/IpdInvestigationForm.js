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
import { PickerInline } from 'filestack-react'
import { useState } from 'react'

const IpdInvestigationForm = (props) => {
  const [url, setUrl] = useState('')


  const onFileUpload = (response) => {
    console.log(response)
    setUrl(response.filesUploaded[0].url)
  }
  const onSubmit = (data) => {
    data['url'] = url
    data['isWaiting'] = false
    props.onSave(data, props?.ipdInvestigation?.id)
  }

  return (
    <div className="rw-form-wrapper text-black">
      <Form onSubmit={onSubmit} error={props.error}>
        {/* <FormError
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

        <FieldError name="ipdId" className="rw-field-error" /> */}

        <div>
          <span>Tests:-</span>
          <div>
            {
              props.ipdInvestigation?.test_list.map((item) =>
                <>
                  <span>{item}</span>
                </>
              )
            }
          </div>

        </div>

        <div className='-z-20'>

          <PickerInline apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
            onSuccess={onFileUpload}
          />
        </div>

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
