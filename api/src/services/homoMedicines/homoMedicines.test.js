import {
  homoMedicines,
  homoMedicine,
  createHomoMedicine,
  updateHomoMedicine,
  deleteHomoMedicine,
} from './homoMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('homoMedicines', () => {
  scenario('returns all homoMedicines', async (scenario) => {
    const result = await homoMedicines()

    expect(result.length).toEqual(Object.keys(scenario.homoMedicine).length)
  })

  scenario('returns a single homoMedicine', async (scenario) => {
    const result = await homoMedicine({ id: scenario.homoMedicine.one.id })

    expect(result).toEqual(scenario.homoMedicine.one)
  })

  scenario('creates a homoMedicine', async () => {
    const result = await createHomoMedicine({
      input: {
        name: 'String',
        no: 'String',
        potency: 'String',
        updated_at: '2023-12-31T15:37:35.734Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.no).toEqual('String')
    expect(result.potency).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-12-31T15:37:35.734Z'))
  })

  scenario('updates a homoMedicine', async (scenario) => {
    const original = await homoMedicine({
      id: scenario.homoMedicine.one.id,
    })
    const result = await updateHomoMedicine({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a homoMedicine', async (scenario) => {
    const original = await deleteHomoMedicine({
      id: scenario.homoMedicine.one.id,
    })
    const result = await homoMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
