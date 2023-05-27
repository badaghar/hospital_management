import { useEffect, useLayoutEffect, useState } from 'react'

import { Label, TextField, FieldError, DateField, NumberField } from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'



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
    const newList = props.medicines.map((item)=>{
      return {...item,'name':item.pid.name}
    })
    setDublicateList(newList)

    const uniqueArray = newList.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.name === obj.name)
    );
    setMedicineList(uniqueArray)
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
      updatedList[props.value] = {id:name[0].id,name:name[0].name};

      return updatedList;
    })
    const newBatchList = dublicatList.filter((item)=>item.name==name[0].name)
    // console.log(newBatchList)
    setBatchList(newBatchList)
  }

  const modifyBatch  = (name) =>{
    if(name.length===0){
      return
    }

    const newMedicineList = batchList.filter((item)=>item.batch==name[0].batch)
    // console.log(newMedicineList)
    setFinalList(newMedicineList)
    set_exp(newMedicineList[0].exp)
    set_mrp(newMedicineList[0].mrp)
    set_cgst_sgst(newMedicineList[0].cgst+newMedicineList[0].sgst)
  }

  useEffect(()=>{

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
      'medicine Name':finalList[0]?.name,
      'batch No':finalList[0]?.batch,
      'Expiry Date':finalList[0]?.exp,
      'mrp':  parseFloat(finalList[0]?.mrp?.toFixed(5)),
      'quantity':quantity,
      'cgst/sgst':parseFloat(finalList[0]?.cgst)+parseFloat(finalList[0]?.sgst),
      'amount': parseFloat((quantity*finalList[0]?.mrp).toFixed(5))
    }

    let medObj = {
      'quantity': parseFloat(finalList[0]?.quantity)-parseFloat(quantity),
      'productId':finalList[0]?.productId,
      'batch':finalList[0]?.batch
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

    // console.log()


  },[quantity,medicineList,batchList])




  // const displayValue = (option) => option.id;
  // console.log(props.medicines)




  return (
    <>

    <div className="flex col-span-4 justify-center">
    <Multiselect
    className="rw-input"
        options={medicineList} // Options to display in the dropdown
        onSelect={(event) => modifyProducts(event)} // Function will trigger on select event
        onRemove={(event) => modifyProducts(event)} // Function will trigger on remove event
        selectionLimit={1}

        displayValue={'name'}// Property name to display in the dropdown options
      />
    </div>
    <div className="flex col-span-3 justify-center">
    <Multiselect
    className="rw-input"
        options={batchList} // Options to display in the dropdown
        onSelect={(event) => modifyBatch(event)} // Function will trigger on select event
        onRemove={(event) => modifyBatch(event)} // Function will trigger on remove event
        selectionLimit={1}

        displayValue={'batch'}// Property name to display in the dropdown options
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

            if(e.target.value>  (finalList[0]?.quantity || 0))
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
