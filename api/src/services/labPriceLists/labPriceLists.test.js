import {
  labPriceLists,
  labPriceList,
  createLabPriceList,
  updateLabPriceList,
  deleteLabPriceList,
} from './labPriceLists'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('labPriceLists', () => {
  scenario('returns all labPriceLists', async (scenario) => {
    const result = await labPriceLists()

    expect(result.length).toEqual(Object.keys(scenario.labPriceList).length)
  })

  scenario('returns a single labPriceList', async (scenario) => {
    const result = await labPriceList({ id: scenario.labPriceList.one.id })

    expect(result).toEqual(scenario.labPriceList.one)
  })

  scenario('creates a labPriceList', async (scenario) => {
    const result = await createLabPriceList({
      input: {
        test_list: { foo: 'bar' },
        updated_at: '2024-02-01T16:40:20.653Z',
        labId: scenario.labPriceList.two.labId,
      },
    })

    expect(result.test_list).toEqual({ foo: 'bar' })
    expect(result.updated_at).toEqual(new Date('2024-02-01T16:40:20.653Z'))
    expect(result.labId).toEqual(scenario.labPriceList.two.labId)
  })

  scenario('updates a labPriceList', async (scenario) => {
    const original = await labPriceList({
      id: scenario.labPriceList.one.id,
    })
    const result = await updateLabPriceList({
      id: original.id,
      input: { test_list: { foo: 'baz' } },
    })

    expect(result.test_list).toEqual({ foo: 'baz' })
  })

  scenario('deletes a labPriceList', async (scenario) => {
    const original = await deleteLabPriceList({
      id: scenario.labPriceList.one.id,
    })
    const result = await labPriceList({ id: original.id })

    expect(result).toEqual(null)
  })
})
