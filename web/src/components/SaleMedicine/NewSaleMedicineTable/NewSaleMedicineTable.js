import { useEffect, useLayoutEffect, useState } from 'react'

import { Label, TextField, FieldError, DateField, NumberField } from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'
import React from 'react'
import Select from 'react-select'


const NewSaleMedicineTable = (props) => {
  const [mrp, set_mrp] = useState(0)
  const [exp, set_exp] = useState(0)
  const [cgst_sgst,set_cgst_sgst] = useState(0)
  const [total_amount,set_total_amount] = useState(0)
  const [quantity,set_quantity] = useState('')

  const [medicineList,setMedicineList] = useState([])
  const [batchList,setBatchList] = useState([])
  const [dublicatList,setDublicateList] = useState([])
  const [finalList,setFinalList] = useState([])

  useLayoutEffect(()=>{
    // const newList = props.medicines.map((item)=>{
    //   return {...item,'name':item.pid.name}
    // })
    const newList = props.medicines
    setDublicateList(newList)

    const uniqueArray = newList.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.name === obj.name)
    );
    setMedicineList(uniqueArray)
    console.log(uniqueArray)
    // console.log(newList)

  },[props.medicines])

  useEffect(()=>{
    set_total_amount(parseFloat(mrp)*parseInt(quantity))

  },[quantity])
  const modifyProducts = (name) =>{
    if(name.length===0){
      return
    }
    props.setProductList((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = {id:name.id,name:name.name};

      return updatedList;
    })

    let newBatchList = dublicatList.filter((item)=>item.name==name.name)
    // console.log(newBatchList)
     newBatchList = newBatchList.map((item) => {
      return {label:item.data.batch,value:item.data.batch,batch:item.data.batch,id:item.id,data:item}
    })

    setBatchList(newBatchList)
  }

  const modifyBatch  = (name) =>{
    if(name.length===0){
      return
    }

    const newMedicineList = batchList.filter((item)=>item.batch==name.batch)
    // console.log(newMedicineList)
    setFinalList(newMedicineList[0].data.data)
    set_exp(newMedicineList[0].data.data.exp)
    set_mrp(newMedicineList[0].data.data.mrp)
    set_cgst_sgst(newMedicineList[0].data.data.cgst+newMedicineList[0].data.data.sgst)
  }

  useEffect(()=>{
    // console.log('finallist ',finalList)

    let total_amount = parseFloat(mrp)*parseInt(quantity)
    // console.log("here",quantity,'total amount ',total_amount)
    const taxPercentage = parseFloat(cgst_sgst)
    const taxAmount = (mrp * taxPercentage) / (100 + taxPercentage);

    props.set_total_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = total_amount - taxAmount;

      return updatedList;
    })

    props.set_total_sgst_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = parseFloat(taxAmount/2.0);

      return updatedList;
    })
    props.set_total_cgst_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = parseFloat(taxAmount/2.0);

      return updatedList;
    })

    let obj = {
      'medicine Name':finalList?.pid?.name,
      'batch No':finalList?.batch,
      'Expiry Date':finalList?.exp,
      'mrp':  parseFloat(finalList?.mrp?.toFixed(5)),
      'quantity':quantity,
      'cgst/sgst':parseFloat(finalList?.cgst)+parseFloat(finalList?.sgst),
      'amount': parseFloat((quantity*finalList?.mrp).toFixed(5))
    }

    let medObj = {
      'quantity': parseFloat(finalList?.quantity)-parseFloat(quantity),
      'productId':finalList?.productId,
      'batch':finalList?.batch
    }

    props.setmedicineObj((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = obj

      return updatedList;
    })
    props.setPermedicineObj((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = medObj

      return updatedList;
    })

    console.log(obj,medObj)

    // console.log()


  },[quantity,medicineList,batchList])




  // const displayValue = (option) => option.id;
  // console.log(props.medicines)




  return (
    <>

    <div className="flex col-span-4 justify-center">
    {/* <Multiselect
    className="rw-input"
        options={medicineList} // Options to display in the dropdown
        onSelect={(event) => modifyProducts(event)} // Function will trigger on select event
        onRemove={(event) => modifyProducts(event)} // Function will trigger on remove event
        selectionLimit={1}

        displayValue={'name'}// Property name to display in the dropdown options
      /> */}
           <Select className='rw-input' options={medicineList} onChange={modifyProducts} isClearable={true}
/>
    </div>
    <div className="flex col-span-3 justify-center">
    {/* <Multiselect
    className="rw-input"
        options={batchList} // Options to display in the dropdown
        onSelect={(event) => modifyBatch(event)} // Function will trigger on select event
        onRemove={(event) => modifyBatch(event)} // Function will trigger on remove event
        selectionLimit={1}

        displayValue={'batch'}// Property name to display in the dropdown options
      /> */}
                 <Select className='rw-input' options={batchList} onChange={modifyBatch} isClearable={true}
/>
    </div>

    <div className="flex col-span-1 justify-center">
      <TextField
        name={'exp_' + props.value}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // onChange={updateTotal}
        // validation={{ required: true }}
        value={exp}
        disabled={true}
      />

      <FieldError name={'exp_' + props.value} className="rw-field-error" />
    </div>
    <div className="flex col-span-1 justify-center">
      <TextField
        name={'mrp_' + props.value}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // onChange={updateTotal}
        value={mrp}
        disabled={true}

        // validation={{ required: true }}
      />

      <FieldError name={'mrp_' + props.value} className="rw-field-error" />
    </div>
    <div className="flex col-span-1 justify-center">
      <NumberField
        name={'quantity_' + props.value}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        onChange={(e)=>
          {

            if(e.target.value>  (finalList?.quantity || 0))
            {
                return
            }
            set_quantity(e.target.value)


          }}
        // validation={{ required: true }}
        value={quantity}
        // disabled={true}
      />

      <FieldError name={'quantity_' + props.value} className="rw-field-error" />
    </div>

    <div className="flex col-span-1 justify-center">
      <TextField
        name={'cgst_sgst_' + props.value}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // onChange={updateTotal}
        disabled={true}
        value={cgst_sgst}
        // validation={{ required: true }}
      />

      <FieldError name={'cgst_sgst_' + props.value} className="rw-field-error" />
    </div>
    <div className="flex col-span-1 justify-center">
      <TextField
        name={'amount_' + props.value}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        // onChange={updateTotal}
        value={total_amount}

        disabled={true}
        // validation={{ required: true }}
      />

      <FieldError name={'amount_' + props.value} className="rw-field-error" />
    </div>
  </>

  )
}

export default NewSaleMedicineTable
