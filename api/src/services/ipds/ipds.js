import { db } from 'src/lib/db'


export const ipds = ({ type }) => {
  console.log('\n\n\n\n\n\n\n\n\n ', type)
  return db.ipd.findMany({
    where: {
      patientType: type
    },
    orderBy: [
      {
        id: 'desc'
      }
    ],
    // where:{
    //   patientType:type
    // }
  })
}

export const ipd = ({ id }) => {
  return db.ipd.findUnique({
    where: { id },
  })
}
export const drWaiting = async ({ id }) => {
  const data = await db.user.findUnique({
    where: {id}
  })
  const name = data.name+'----'
  console.log('\n\n\n\n\n\n\n\n\n\n',name)
  return db.ipd.findMany({
    where: {
      consultant_doctor:name,
      isWaiting:true
    }
  })
}
export const pharmacyWaiting = async () => {
  return db.ipd.findMany({
    where: {
      pharmacyWaiting:true
    }
  })
}

export const dischargePatient = async ({ id }) => {
  const date = new Date()
  await db.ipd.update(
    {
      data: {
        discharge_date: date
      },
      where: {
        id: id
      }
    }
  )

  const data = await db.bed.findFirst({
    where: {
      ipdId: id,
    },
  });
  await db.bed.update({
    where: {
      id: data.id
    },
    data: {
      occupied: false,
      ipdId: null
    }
  })
}
export const undischargePatient = async ({ id, bed }) => {

  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', id, bed)

  await db.ipd.update(
    {
      data: {
        discharge_date: null
      },
      where: {
        id: id
      }
    }
  )
  try {
    await db.bed.update({
      where: {
        id: bed
      },
      data: {
        occupied: true,
        ipdId: id
      }
    })

  } catch (error) {
    console.log(error)
  }


}

export const createIpd = async ({ input }) => {

  let { extra_data, ...data } = input
  let { DoctorCharges, OtherCharges, IpdPayment, bed } = extra_data

  let ipd = await db.ipd.create({
    data: data,
  })

  try {
    await db.bed.update({
      where: {
        id: bed
      },
      data: {
        occupied: true,
        ipdId: ipd.id
      }
    })

  } catch (error) {
    console.log(error)
  }


  IpdPayment['ipdId'] = ipd.id
  await db.ipdPayment.create({
    data: IpdPayment
  })

  let otherChargesArray = OtherCharges.map((item) => {
    return { ...item, ipdId: ipd.id }
  })
  let doctorChargesArray = DoctorCharges.map((item) => {
    return { ...item, ipdId: ipd.id }
  })
  await db.ipdCharges.createMany({
    data: otherChargesArray
  })
  await db.ipdConsultation.createMany({
    data: doctorChargesArray
  })
  let obj = {
    note: '',
    ipdId: ipd.id
  }
  await db.Complaints.create({
    data: obj
  })

  return ipd




}

export const updateIpd = ({ id, input }) => {
  return db.ipd.update({
    data: input,
    where: { id },
  })
}

export const deleteIpd = async ({ id }) => {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', id)

  const data = await db.ipd.delete({
    where: { id },
  })
  try {
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', id)


    await db.bed.updateMany({
      where: {
        ipdId: null
      },

      data: {
        occupied: false,

      }
    })

    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', id)


  } catch (error) {
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', error)

    console.log(error)
  }
  return data
}

export const Ipd = {
  patient: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).patient()
  },
  IpdCharges: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdCharges()
  },
  IpdConsultation: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdConsultation()
  },
  IpdPayment: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdPayment()
  },
  Bed: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).Bed()
  },
  IpdLabCharges: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdLabCharges()
  },
  IpdOperationPayment: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdOperationPayment()
  },
  IpdChat: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdChat()
  },
  IpdSummary: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdSummary()
  },
  IpdPrescription: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdPrescription()
  },
  IpdHomoPrescription: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).IpdHomoPrescription()
  },
  File: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).File()
  },
  Complaints: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).Complaints()
  },
}
