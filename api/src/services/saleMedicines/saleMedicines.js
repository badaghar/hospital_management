import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const saleMedicines = () => {
  return db.saleMedicine.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const saleMedicine = ({ id }) => {
  return db.saleMedicine.findUnique({
    where: { id },
  })
}

export const createSaleMedicine = async ({ input }) => {
  const {permedicine,...data} =  input

  const lastRow = await db.saleMedicine.findFirst({
    orderBy: {
      id: 'desc'
    }
  });

  const no = lastRow ? parseInt(lastRow.id) + 1 : 1;

  const start = 'SVPH632'+no
  data['billNo'] = start
  const med = await db.saleMedicine.create({

    data: data,
  })
  console.log("\n\n\n\n\n\n\n\n permedicine",permedicine)

  for(let i=0;i<permedicine.length;i++)
  {
    // console.log("\n\n\n\n\n\n\n\n i value is ",i)s

    let q
    if(permedicine[i].quantity==-1)
    {
      q = 0
      // console.log("\n\n\n\n\n\n\n\n quantity",q)

    }else{
      q = permedicine[i].quantity
      // console.log("\n\n\n\n\n\n\n\n quantity")
    }




     await db.medicine.update({
      data:{
        'quantity': q
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

export const updateSaleMedicine = ({ id, input }) => {
  return db.saleMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteSaleMedicine = async ({ id }) => {
  const data = await db.saleMedicine.delete({
    where: { id },
  })

  data.medicine.map(async (med) => {
    // const qty = (med.free_qty + med.paid_qty) * med.pack
    const qty =  parseInt(med.quantity)

    const medData =  await db.medicine.findFirst({
      where:{
        batch: med['batch No'],
        pid:{
          name:med['medicine Name']
        }
      }
    })
    await db.medicine.update({
      where: {
        id:medData.id
      },
      data: {
        quantity: {
          increment: qty
        }
      }

    })
  })

  return data
}

export const SaleMedicine = {
  patient: (_obj, { root }) => {
    return db.saleMedicine.findUnique({ where: { id: root?.id } }).patient()
  },
}
