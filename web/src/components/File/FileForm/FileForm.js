import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { PickerInline } from 'filestack-react'
import { useState } from 'react'
const FileForm = (props) => {

  const [url, setUrl] = useState(props?.image?.url)


  const onFileUpload = (response) => {
    console.log(response)
    setUrl(response.filesUploaded[0].url)
  }

  const onSubmit = (data) => {
    // const dataWithUrl = Object.assign(data, { url })
    data['url'] = url
    data['ipdId'] = 21
    console.log(data)
    props.onSave(data, props?.image?.id)
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
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.file?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <div className='-z-20'>

        <PickerInline apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
        onSuccess={onFileUpload}
        />
        </div>

        {/* <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.file?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" /> */}

        {/* <Label
          name="ipdId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ipd id
        </Label>

        <NumberField
          name="ipdId"
          defaultValue={props.file?.ipdId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ipdId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FileForm
