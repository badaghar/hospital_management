import { db } from 'src/lib/db'

export const purchaseMedicines = () => {
  return db.purchaseMedicine.findMany()
}

export const purchaseMedicine = ({ id }) => {
  return db.purchaseMedicine.findUnique({
    where: { id },
  })
}
export const checkInvoiceNumber = ({ invoiceNo }) => {
  return db.purchaseMedicine.findMany({
    where: { invoiceNo },
  })
}

export const createPurchaseMedicine = async ({ input }) => {
  const {permedicine,...data} =  input

  const med = await db.purchaseMedicine.create({
    data: data,
  })

  for(let i=0;i<permedicine.length;i++)
  {
    try {
      await db.medicine.create({
        data:permedicine[i]
      })

    } catch (error) {
      const getdata = await db.medicine.findFirst({
        where:{
          'productId':permedicine[i].productId,
          'batch':permedicine[i].batch
        }

      })

      await db.medicine.update({
        data:{
          'quantity': getdata.quantity + permedicine[i].quantity
        },
        where: {
          productId_batch: {
            productId: permedicine[i].productId,
            batch: permedicine[i].batch
          }
        }
      })

    }
  }
  return med
}

export const updatePurchaseMedicine = ({ id, input }) => {
  return db.purchaseMedicine.update({
    data: input,
    where: { id },
  })
}

export const deletePurchaseMedicine = ({ id }) => {
  return db.purchaseMedicine.delete({
    where: { id },
  })
}

export const PurchaseMedicine = {
  did: (_obj, { root }) => {
    return db.purchaseMedicine.findUnique({ where: { id: root?.id } }).did()
  },
}
