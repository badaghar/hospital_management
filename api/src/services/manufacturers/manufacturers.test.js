import {
  manufacturers,
  manufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
} from './manufacturers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('manufacturers', () => {
  scenario('returns all manufacturers', async (scenario) => {
    const result = await manufacturers()

    expect(result.length).toEqual(Object.keys(scenario.manufacturer).length)
  })

  scenario('returns a single manufacturer', async (scenario) => {
    const result = await manufacturer({ id: scenario.manufacturer.one.id })

    expect(result).toEqual(scenario.manufacturer.one)
  })

  scenario('creates a manufacturer', async () => {
    const result = await createManufacturer({
      input: { name: 'String', updated_at: '2023-05-21T14:27:58.223Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-05-21T14:27:58.223Z'))
  })

  scenario('updates a manufacturer', async (scenario) => {
    const original = await manufacturer({
      id: scenario.manufacturer.one.id,
    })
    const result = await updateManufacturer({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a manufacturer', async (scenario) => {
    const original = await deleteManufacturer({
      id: scenario.manufacturer.one.id,
    })
    const result = await manufacturer({ id: original.id })

    expect(result).toEqual(null)
  })
})
