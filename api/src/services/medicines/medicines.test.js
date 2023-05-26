import {
  medicines,
  medicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from './medicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('medicines', () => {
  scenario('returns all medicines', async (scenario) => {
    const result = await medicines()

    expect(result.length).toEqual(Object.keys(scenario.medicine).length)
  })

  scenario('returns a single medicine', async (scenario) => {
    const result = await medicine({ id: scenario.medicine.one.id })

    expect(result).toEqual(scenario.medicine.one)
  })

  scenario('creates a medicine', async (scenario) => {
    const result = await createMedicine({
      input: {
        quantity: 8224937,
        productId: scenario.medicine.two.productId,
        batch: 'String',
        exp: '2023-05-25T14:23:20.896Z',
        mrp: 9640851.49610403,
        sgst: 8637305.378426645,
        cgst: 4369484.109766739,
        discount: 3208546.3431149195,
        updated_at: '2023-05-25T14:23:20.896Z',
      },
    })

    expect(result.quantity).toEqual(8224937)
    expect(result.productId).toEqual(scenario.medicine.two.productId)
    expect(result.batch).toEqual('String')
    expect(result.exp).toEqual(new Date('2023-05-25T14:23:20.896Z'))
    expect(result.mrp).toEqual(9640851.49610403)
    expect(result.sgst).toEqual(8637305.378426645)
    expect(result.cgst).toEqual(4369484.109766739)
    expect(result.discount).toEqual(3208546.3431149195)
    expect(result.updated_at).toEqual(new Date('2023-05-25T14:23:20.896Z'))
  })

  scenario('updates a medicine', async (scenario) => {
    const original = await medicine({
      id: scenario.medicine.one.id,
    })
    const result = await updateMedicine({
      id: original.id,
      input: { quantity: 7640671 },
    })

    expect(result.quantity).toEqual(7640671)
  })

  scenario('deletes a medicine', async (scenario) => {
    const original = await deleteMedicine({
      id: scenario.medicine.one.id,
    })
    const result = await medicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
