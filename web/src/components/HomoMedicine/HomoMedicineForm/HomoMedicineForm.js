import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useState } from 'react';

function convertObjectValuesToUpper(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // throw new Error('Input must be an object.');
    return {}
  }

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim().toUpperCase();
    }
  }

  return obj;
}

const HomoMedicineForm = (props) => {


  const [selectedItems, setSelectedItems] = useState(['', '', '', '', '', '', '', '', '', '', ""]);
  const [potency, setPotency] = useState(['Q', '1x', '3x', '6x', '12x', '30c', '200', '1M', '10M', '50M', "CM"]);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (quantity) => {
    // If quantity is checked, add it to the checkedItems array; otherwise, remove it
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(quantity)
        ? prevCheckedItems.filter((item) => item !== quantity)
        : [...prevCheckedItems, quantity]
    );
  };
  const onSubmit = (data) => {
    data = convertObjectValuesToUpper(data)
    data['potency'] = 'value'
    data['extra'] = {
      checkedItems
    }
    props.onSave(data, props?.homoMedicine?.id)
  }



// Function to handle item selection for a specific row
const handleItemSelect = (rowIndex, selectedItem) => {
  const newSelectedItems = [...selectedItems];
  newSelectedItems[rowIndex] = selectedItem;
  setSelectedItems(newSelectedItems);
};

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
        name="name"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Name
      </Label>

      <TextField
        name="name"
        defaultValue={props.homoMedicine?.name}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="name" className="rw-field-error" />

      <Label
        name="no"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        No
      </Label>

      <TextField
        name="no"
        defaultValue={props.homoMedicine?.no}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="no" className="rw-field-error" />
      {/*
        <Label
          name="potency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Potency
        </Label>

        <TextField
          name="potency"
          defaultValue={props.homoMedicine?.potency}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <FieldError name="potency" className="rw-field-error" /> */}

      <Label
        name="potency"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Potency
      </Label>

      <div>
        <div className='grid grid-cols-4 text-xl'>
        {potency.map((pty) => (
            <div key={pty} className='flex space-x-2 relative'>
              <input
                type="checkbox"
                id={`potency-${pty}`}
                checked={checkedItems.includes(pty)}
                onChange={() => handleCheckboxChange(pty)}
                className="mr-2"
              />
              <label htmlFor={`potency-${pty}`}>{pty}</label>
            </div>
          ))}
        </div>
      </div>
{/*
      <div>
        <div className='grid grid-cols-4 text-xl'>
          {potency.map((item, rowIndex) => (
            <div key={rowIndex} className='flex space-x-2 relative'>
              <label htmlFor={rowIndex} >{item}</label>
              <select
              className='absolute left-10'
                value={selectedItems[rowIndex] || ''}
                onChange={(e) => handleItemSelect(rowIndex, e.target.value)}
                id={rowIndex}
              >
                <option value="">None</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
              </select>
            </div>
          ))}
        </div>
      </div> */}



      <div className="rw-button-group">
        <Submit disabled={props.loading} className="rw-button rw-button-blue">
          Save
        </Submit>
      </div>
    </Form>
  </div>
)
}

export default HomoMedicineForm
