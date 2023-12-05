import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
const OpdPrescriptionPage = () => {

  const onSubmit = (data) => {
    navigate(routes.opdPrescripdeCell({id:data['opdId']}))

  }
  return (
    <>
    <div className='flex justify-center text-white font-bold uppercase mt-4 underline'>
      <span>Prescribed Medicine</span>
    </div>
    <Form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">


    <FormError

          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />


      <div className="mb-4">

        <Label
          name="opdId"
          className="rw-label text-white font-bold"
          errorClassName="rw-label rw-label-error"
        >
          Enter OPD ID
        </Label>


        <TextField
          name="opdId"

          className="rw-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          errorClassName="rw-input rw-input-error"
          placeholder="Enter Opd ID"
          validation={{ required: true,valueAsNumber:true }}
        />

        <FieldError name="opdId" className="rw-field-error" />

      </div>

      {/* Add other form fields as needed */}

      <Submit className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </Submit>
    </Form>
    </>
  )
}

export default OpdPrescriptionPage
