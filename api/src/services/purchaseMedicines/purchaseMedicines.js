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

  const billData = {
    purchaseMedicineId: med.id,
    total: med.total,
    balance: med.total,
    paid: 0,
    method: "",
    remark: ""
  }

  await db.paymentPurchaseMedicine.create({
    data: billData,
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


// pharmacy Report
export const distributersReport = async ({ id,startDate,endDate }) => {

  const data = await db.purchaseMedicine.findMany({
    where: {
      distributerId:id,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const totalSum = data.reduce((sum, item) => sum + item.total, 0);
  return {data,totalSum}
}
export const purchaseReport = async ({ startDate,endDate }) => {
  const data = await db.purchaseMedicine.findMany({
    where: {
      date: {

        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const totalSum = data.reduce((sum, item) => sum + item.total, 0);
  return {data,totalSum}
}
export const saleReport = async ({ startDate,endDate }) => {
  const data = await db.saleMedicine.findMany({
    where: {
      date: {

        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const totalSum = data.reduce((sum, item) => sum + item.grand_total, 0);
  return {data,totalSum}
}

// hospital Report

export const ipdReport = async ({ startDate,endDate }) => {
  const data = await db.ipd.findMany({
    where: {
      date_of_admission : {

        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const totalSum = data.reduce((sum, item) => sum + item.paid_amount, 0);
  return {data,totalSum}
}
export const opdReport = async ({ startDate,endDate }) => {
  const data = await db.opd.findMany({
    where: {
      created_at : {

        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  const totalSum = data.reduce((sum, item) => sum + item.amount, 0);
  return {data,totalSum}
}

export const pharmacyPayment = async ({ id,startDate,endDate }) => {
  let data;
  if(id==1)
  {
    data = await db.paymentPurchaseMedicine.findMany({
      where: {
        balance:0,
        updated_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

  }
  else {
    data = await db.paymentPurchaseMedicine.findMany({
      where: {
        balance: {
          not: 0
        },
        updated_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

  }



  const totalSum = data.reduce((sum, item) => sum + item.paid, 0);
  return {data,totalSum}
}

export const PurchaseMedicine = {
  did: (_obj, { root }) => {
    return db.purchaseMedicine.findUnique({ where: { id: root?.id } }).did()
  },
}
