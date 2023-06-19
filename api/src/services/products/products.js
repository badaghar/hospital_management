import { db } from 'src/lib/db'

export const products = () => {
  return db.product.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const product = ({ id }) => {
  return db.product.findUnique({
    where: { id },
  })
}

export const createProduct = async ({ input }) => {

  let productInput = {...input}
  delete productInput['compositionList']
  const getProduct =  await db.product.create({
    data: productInput,
  })
  let newData = []
  for(let i=0;i<input['compositionList'].length;i++)
  {
    newData.push({'productId':getProduct.id,'compositionId':input['compositionList'][i]})

  }
  console.log(newData)
  await db.productToComposition.createMany(
    {
      data:newData
    }
  )
  return getProduct
}

export const updateProduct = async ({ id, input }) => {
  let productInput = {...input}
  delete productInput['compositionList']
  const oldData = await db.product.update({
    data: productInput,
    where: { id },
  })

  await db.productToComposition.deleteMany({
    where:{
      'productId':oldData.id
    }
  })



  let newData = []
  for(let i=0;i<input['compositionList'].length;i++)
  {
    newData.push({'productId':oldData.id,'compositionId':input['compositionList'][i]})

  }
  console.log(newData)
  await db.productToComposition.createMany(
    {
      data:newData
    }
  )

  return oldData
}


export const deleteProduct = ({ id }) => {
  return db.product.delete({
    where: { id },
  })
}

export const Product = {
  mid: (_obj, { root }) => {
    return db.product.findUnique({ where: { id: root?.id } }).mid()
  },
  Medicine: (_obj, { root }) => {
    return db.product.findUnique({ where: { id: root?.id } }).Medicine()
  },
  ProductToComposition: (_obj, { root }) => {
    return db.product
      .findUnique({ where: { id: root?.id } })
      .ProductToComposition()
  },
}
