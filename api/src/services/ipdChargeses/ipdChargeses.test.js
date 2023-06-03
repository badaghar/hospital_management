import {
  ipdChargeses,
  ipdCharges,
  createIpdCharges,
  updateIpdCharges,
  deleteIpdCharges,
} from './ipdChargeses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdChargeses', () => {
  scenario('returns all ipdChargeses', async (scenario) => {
    const result = await ipdChargeses()

    expect(result.length).toEqual(Object.keys(scenario.ipdCharges).length)
  })

  scenario('returns a single ipdCharges', async (scenario) => {
    const result = await ipdCharges({ id: scenario.ipdCharges.one.id })

    expect(result).toEqual(scenario.ipdCharges.one)
  })

  scenario('creates a ipdCharges', async (scenario) => {
    const result = await createIpdCharges({
      input: {
        charge_type: 'String',
        charge: 4533887.593446992,
        quantity: 5999743,
        total: 8486707.000436662,
        updated_at: '2023-06-02T13:16:03.333Z',
        ipdId: scenario.ipdCharges.two.ipdId,
      },
    })

    expect(result.charge_type).toEqual('String')
    expect(result.charge).toEqual(4533887.593446992)
    expect(result.quantity).toEqual(5999743)
    expect(result.total).toEqual(8486707.000436662)
    expect(result.updated_at).toEqual(new Date('2023-06-02T13:16:03.333Z'))
    expect(result.ipdId).toEqual(scenario.ipdCharges.two.ipdId)
  })

  scenario('updates a ipdCharges', async (scenario) => {
    const original = await ipdCharges({
      id: scenario.ipdCharges.one.id,
    })
    const result = await updateIpdCharges({
      id: original.id,
      input: { charge_type: 'String2' },
    })

    expect(result.charge_type).toEqual('String2')
  })

  scenario('deletes a ipdCharges', async (scenario) => {
    const original = await deleteIpdCharges({
      id: scenario.ipdCharges.one.id,
    })
    const result = await ipdCharges({ id: original.id })

    expect(result).toEqual(null)
  })
})
