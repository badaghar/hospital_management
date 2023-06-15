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

const ManufacturerPurchaseMedicineForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.manufacturerPurchaseMedicine?.id)
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
          name="productId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product id
        </Label>

        <NumberField
          name="productId"
          defaultValue={props.manufacturerPurchaseMedicine?.productId}
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
          defaultValue={props.manufacturerPurchaseMedicine?.batch}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="batch" className="rw-field-error" />

        <Label
          name="paid_qty"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Paid qty
        </Label>

        <NumberField
          name="paid_qty"
          defaultValue={props.manufacturerPurchaseMedicine?.paid_qty}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="paid_qty" className="rw-field-error" />

        <Label
          name="free_qty"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Free qty
        </Label>

        <NumberField
          name="free_qty"
          defaultValue={props.manufacturerPurchaseMedicine?.free_qty}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="free_qty" className="rw-field-error" />

        <Label
          name="pack"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pack
        </Label>

        <NumberField
          name="pack"
          defaultValue={props.manufacturerPurchaseMedicine?.pack}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="pack" className="rw-field-error" />

        <Label
          name="exp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Exp
        </Label>

        <DatetimeLocalField
          name="exp"
          defaultValue={formatDatetime(props.manufacturerPurchaseMedicine?.exp)}
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
          defaultValue={props.manufacturerPurchaseMedicine?.mrp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="mrp" className="rw-field-error" />

        <Label
          name="rate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rate
        </Label>

        <TextField
          name="rate"
          defaultValue={props.manufacturerPurchaseMedicine?.rate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="rate" className="rw-field-error" />

        <Label
          name="dis"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dis
        </Label>

        <TextField
          name="dis"
          defaultValue={props.manufacturerPurchaseMedicine?.dis}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="dis" className="rw-field-error" />

        <Label
          name="sgst"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sgst
        </Label>

        <TextField
          name="sgst"
          defaultValue={props.manufacturerPurchaseMedicine?.sgst}
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
          defaultValue={props.manufacturerPurchaseMedicine?.cgst}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="cgst" className="rw-field-error" />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.manufacturerPurchaseMedicine?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="net_amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Net amount
        </Label>

        <TextField
          name="net_amount"
          defaultValue={props.manufacturerPurchaseMedicine?.net_amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="net_amount" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ManufacturerPurchaseMedicineForm
