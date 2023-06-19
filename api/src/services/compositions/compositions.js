import { db } from 'src/lib/db'

export const compositions = () => {
  return db.composition.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const composition = ({ id }) => {
  return db.composition.findUnique({
    where: { id },
  })
}

export const createComposition = ({ input }) => {
  return db.composition.create({
    data: input,
  })
}

export const updateComposition = ({ id, input }) => {
  return db.composition.update({
    data: input,
    where: { id },
  })
}

export const deleteComposition = ({ id }) => {
  return db.composition.delete({
    where: { id },
  })
}

export const Composition = {
  ProductToComposition: (_obj, { root }) => {
    return db.composition
      .findUnique({ where: { id: root?.id } })
      .ProductToComposition()
  },
}
