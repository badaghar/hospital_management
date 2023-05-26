import {
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
} from './products'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('products', () => {
  scenario('returns all products', async (scenario) => {
    const result = await products()

    expect(result.length).toEqual(Object.keys(scenario.product).length)
  })

  scenario('returns a single product', async (scenario) => {
    const result = await product({ id: scenario.product.one.id })

    expect(result).toEqual(scenario.product.one)
  })

  scenario('creates a product', async (scenario) => {
    const result = await createProduct({
      input: {
        name: 'String',
        manufacturerId: scenario.product.two.manufacturerId,
        updated_at: '2023-05-21T15:23:21.979Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.manufacturerId).toEqual(scenario.product.two.manufacturerId)
    expect(result.updated_at).toEqual(new Date('2023-05-21T15:23:21.979Z'))
  })

  scenario('updates a product', async (scenario) => {
    const original = await product({ id: scenario.product.one.id })
    const result = await updateProduct({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a product', async (scenario) => {
    const original = await deleteProduct({
      id: scenario.product.one.id,
    })
    const result = await product({ id: original.id })

    expect(result).toEqual(null)
  })
})
