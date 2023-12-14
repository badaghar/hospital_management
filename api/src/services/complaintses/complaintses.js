import { db } from 'src/lib/db'

export const complaintses = () => {
  return db.complaints.findMany()
}

export const complaints = ({ id }) => {
  return db.complaints.findUnique({
    where: { id },
  })
}

export const createComplaints = ({ input }) => {
  return db.complaints.create({
    data: input,
  })
}

export const updateComplaints = ({ id, input }) => {
  return db.complaints.update({
    data: input,
    where: { id },
  })
}

export const deleteComplaints = ({ id }) => {
  return db.complaints.delete({
    where: { id },
  })
}

export const Complaints = {
  ipd: (_obj, { root }) => {
    return db.complaints.findUnique({ where: { id: root?.id } }).ipd()
  },
}
