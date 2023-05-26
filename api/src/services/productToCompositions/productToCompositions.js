import { db } from 'src/lib/db'

export const productToCompositions = () => {
  return db.productToComposition.findMany()
}

export const productToComposition = ({ id }) => {
  return db.productToComposition.findUnique({
    where: { id },
  })
}

export const createProductToComposition = ({ input }) => {
  return db.productToComposition.create({
    data: input,
  })
}

export const updateProductToComposition = ({ id, input }) => {
  return db.productToComposition.update({
    data: input,
    where: { id },
  })
}

export const deleteProductToComposition = ({ id }) => {
  return db.productToComposition.delete({
    where: { id },
  })
}

export const ProductToComposition = {
  cid: (_obj, { root }) => {
    return db.productToComposition.findUnique({ where: { id: root?.id } }).cid()
  },
  pid: (_obj, { root }) => {
    return db.productToComposition.findUnique({ where: { id: root?.id } }).pid()
  },
}
