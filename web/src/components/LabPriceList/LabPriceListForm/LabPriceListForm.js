import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'
import { useState, useEffect } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import Select from 'react-select'
const LabPriceListForm = (props) => {

  const [testTypeArray, setTestTypeArray] = useState([])
  const [labs,setLabs] = useState([])
  const [labId,setLabId] = useState(0)
  const [defaultLab,setdefaultLab] = useState('')
  const addTestType = () => {
    setTestTypeArray((item) => [...item, { type: '', amount: 0 }])
    // setNoOfDoctorCharges((item) => item + 1)
  }
  const deleteTestType = (index) => {
    console.log('hello')
    setTestTypeArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });



  }

  useEffect(()=>{
    if(props.labPriceList){
      setLabId(props.labPriceList.labId)
      const arrLabs = props.labs.filter((it)=>it.id==props.labPriceList.labId).map((item) => {
        const obj = { 'label': item.name, 'value': item.id, data: item }
        return obj
      })
      setdefaultLab(arrLabs[0])
      setTestTypeArray(props.labPriceList.test_list)
    }

  },[props.labPriceList])


  useEffect(()=>{
    const arrLabs = props.labs.map((item) => {
      const obj = { 'label': item.name, 'value': item.id, data: item }
      return obj
    })
    // // console.log(arrPat)
    setLabs(arrLabs)
  },[])
  const changeLab = (item)=>{
    setdefaultLab(item)
      setLabId(item.value)
  }

  const onSubmit = (data) => {
    if(labId==0){
      toast.error('Select Lab')
      return
    }
    data['test_list'] = testTypeArray
    data['labId'] = labId
    props.onSave(data, props?.labPriceList?.id)
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

        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            className="rw-label mt-0"
          >
            Consultant Doctor Name
          </Label>
          <div className={`${'flex-1'}`}>
            <Select options={labs} onChange={changeLab} isClearable={true}
            value={defaultLab}
            />
          </div>
        </div>


        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-3 grid-flow-row gap-x-2 gap-y-2">

            <TestTypeHeader />

            {
              testTypeArray.map((item, index) => {
                return (
                  <>
                    <TestTypeBody key={index} item={item} index={index}
                      testTypeArray={testTypeArray}
                      setTestTypeArray={setTestTypeArray}
                      del={deleteTestType}


                    />


                  </>
                )
              })
            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addTestType}>Add Test Charge</div>
          </div>
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
const TestTypeHeader = () => {
  return (
    <>
      <div className="flex col-span-1 justify-center">Test Type</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Action</div>
    </>
  )
}
const TestTypeBody = ({ item, testTypeArray, del, setTestTypeArray, index }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const testTypeChange = (name, value, func) => {
    // console.log('hello')
    console.log(name, value)
    func(value)
    setTestTypeArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        [name]: value

      };
      return newArray;
    })
  }
  // console.log(setTestTypeArray)


  useEffect(() => {
    if (item.type) {
      setName(item.type)
    }
    if (item.amount)
      (
        setAmount(item.amount)
      )
  }, [item])

  return (
    <>
      <div className="flex col-span-1 justify-center ">
        <input type="text" className="text-black border border-black p-2" name="type" id="" value={name} onChange={(e) => {
          // setName(e.target.value);
          testTypeChange(e.target.name, e.target.value, setName);

        }} required />

      </div>
      <div className="flex col-span-1 justify-center ">
        <input type="number" className="text-black border border-black p-2" name="amount" id="" value={amount} onChange={(e) => testTypeChange(e.target.name, e.target.value, setAmount)} required />

      </div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>

    </>
  )

}
export default LabPriceListForm
