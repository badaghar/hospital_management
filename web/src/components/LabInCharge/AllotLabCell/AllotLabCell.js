
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  SelectField,
} from '@redwoodjs/forms'


export const QUERY = gql`
  query FindAllotLabQuery {
    labs{
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ labs }) => {
  return (
    <>
                      <div className='text-black'>


<Label
  name="lab"
  className="rw-label"
  errorClassName="rw-label rw-label-error"
>
  Select the Lab
</Label>

<SelectField
  name="lab"
  validation={{
    required: true,
    validate: {
      matchesInitialValue: (value) => {
        return (
          value !== 'Please select an option' || 'Select an Option'
        )
      },
    },
  }}
>
  <option>Please select an option</option>
  {/* <option value={'admin'}>Admin</option>
  <option value={'reciptionist'}>Reciptionist</option>
  <option value={'pharmacy'}>Pharmacy</option>
  <option value={'doctor'}>Doctor</option> */}
  {
    labs.map((item)=>{
      return(
        <option value={item.name}>{item.name}</option>
      )
    })
  }

</SelectField>

<FieldError name="lab" className="rw-field-error" />
</div>

    </>
  )
}
