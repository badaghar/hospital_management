import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const MedicineForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.medicine?.id)
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
          name="exp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Exp
        </Label>

        <DatetimeLocalField
          name="exp"
          defaultValue={formatDatetime(props.medicine?.exp)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="exp" className="rw-field-error" />

        <Label
          name="mrp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mrp
        </Label>

        <TextField
          name="mrp"
          defaultValue={props.medicine?.mrp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="mrp" className="rw-field-error" />


        <Label
          name="quantity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Quantity
        </Label>

        <NumberField
          name="quantity"
          defaultValue={props.medicine?.quantity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
       <FieldError name="quantity" className="rw-field-error" />
   {!props.medicine.id &&
   <>


        <Label
          name="productId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product id
        </Label>

        <NumberField
          name="productId"
          defaultValue={props.medicine?.productId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="productId" className="rw-field-error" />

        <Label
          name="batch"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Batch
        </Label>

        <TextField
          name="batch"
          defaultValue={props.medicine?.batch}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="batch" className="rw-field-error" />

        <Label
          name="exp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Exp
        </Label>

        <DatetimeLocalField
          name="exp"
          defaultValue={formatDatetime(props.medicine?.exp)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="exp" className="rw-field-error" />

        <Label
          name="mrp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mrp
        </Label>

        <TextField
          name="mrp"
          defaultValue={props.medicine?.mrp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="mrp" className="rw-field-error" />

        <Label
          name="sgst"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sgst
        </Label>

        <TextField
          name="sgst"
          defaultValue={props.medicine?.sgst}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="sgst" className="rw-field-error" />

        <Label
          name="cgst"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cgst
        </Label>

        <TextField
          name="cgst"
          defaultValue={props.medicine?.cgst}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="cgst" className="rw-field-error" />

        <Label
          name="discount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Discount
        </Label>

        <TextField
          name="discount"
          defaultValue={props.medicine?.discount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="discount" className="rw-field-error" />
        </>
}
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MedicineForm
