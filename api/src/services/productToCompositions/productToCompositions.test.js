import {
  productToCompositions,
  productToComposition,
  createProductToComposition,
  updateProductToComposition,
  deleteProductToComposition,
} from './productToCompositions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('productToCompositions', () => {
  scenario('returns all productToCompositions', async (scenario) => {
    const result = await productToCompositions()

    expect(result.length).toEqual(
      Object.keys(scenario.productToComposition).length
    )
  })

  scenario('returns a single productToComposition', async (scenario) => {
    const result = await productToComposition({
      id: scenario.productToComposition.one.id,
    })

    expect(result).toEqual(scenario.productToComposition.one)
  })

  scenario('creates a productToComposition', async (scenario) => {
    const result = await createProductToComposition({
      input: {
        compositionId: scenario.productToComposition.two.compositionId,
        productId: scenario.productToComposition.two.productId,
      },
    })

    expect(result.compositionId).toEqual(
      scenario.productToComposition.two.compositionId
    )
    expect(result.productId).toEqual(
      scenario.productToComposition.two.productId
    )
  })

  scenario('updates a productToComposition', async (scenario) => {
    const original = await productToComposition({
      id: scenario.productToComposition.one.id,
    })
    const result = await updateProductToComposition({
      id: original.id,
      input: {
        compositionId: scenario.productToComposition.two.compositionId,
      },
    })

    expect(result.compositionId).toEqual(
      scenario.productToComposition.two.compositionId
    )
  })

  scenario('deletes a productToComposition', async (scenario) => {
    const original = await deleteProductToComposition({
      id: scenario.productToComposition.one.id,
    })
    const result = await productToComposition({ id: original.id })

    expect(result).toEqual(null)
  })
})
