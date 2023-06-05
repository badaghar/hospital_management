import { db } from 'src/lib/db'

export const ipds = () => {
  return db.ipd.findMany()
}

export const ipd = ({ id }) => {
  return db.ipd.findUnique({
    where: { id },
  })
}

export const createIpd = async ({ input }) => {

  let {extra_data,...data} = input

  let ipd =  await db.ipd.create({
    data: data,
  })

  let {DoctorCharges,OtherCharges,IpdPayment,bed} = extra_data
  await db.bed.update({
    where: {
      id: bed
    },
    data :{
      occupied: true,
      ipdId:ipd.id
    }
  })

  IpdPayment['ipdId'] = ipd.id
  await db.ipdPayment.create({
    data : IpdPayment
  })

  let otherChargesArray = OtherCharges.map((item)=>{
    return {...item,ipdId:ipd.id}
  })
  let doctorChargesArray = DoctorCharges.map((item)=>{
    return {...item,ipdId:ipd.id}
  })
  await db.ipdCharges.createMany({
    data: otherChargesArray
  })
  await db.ipdConsultation.createMany({
    data: doctorChargesArray
  })

  return ipd




}

export const updateIpd = ({ id, input }) => {
  return db.ipd.update({
    data: input,
    where: { id },
  })
}

export const deleteIpd = ({ id }) => {
  return db.ipd.delete({
    where: { id },
  })
}

export const Ipd = {
  patient: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).patient()
  },
  Operation: (_obj, { root }) => {
    return db.ipd.findUnique({ where: { id: root?.id } }).Operation()
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
}
