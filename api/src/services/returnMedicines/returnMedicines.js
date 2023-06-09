import { db } from 'src/lib/db'

export const returnMedicines = () => {
  return db.returnMedicine.findMany()
}

export const returnMedicine = ({ id }) => {
  return db.returnMedicine.findUnique({
    where: { id },
  })
}

export const createReturnMedicine = async ({ input }) => {
  const {permedicine,...data} =  input
  const med = await db.returnMedicine.create({

    data: data,
  })

  for(let i=0;i<permedicine.length;i++)
  {

     await db.medicine.update({
      data:{
        'quantity': permedicine[i].quantity
      },
      where: {
        productId_batch: {
          productId: permedicine[i].productId,
          batch: permedicine[i].batch
        }
      }
    })
  }
  return med
}

export const updateReturnMedicine = ({ id, input }) => {
  return db.returnMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteReturnMedicine = ({ id }) => {
  return db.returnMedicine.delete({
    where: { id },
  })
}

export const ReturnMedicine = {
  patient: (_obj, { root }) => {
    return db.returnMedicine.findUnique({ where: { id: root?.id } }).patient()
  },
}
