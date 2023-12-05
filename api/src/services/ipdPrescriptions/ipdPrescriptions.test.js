import {
  ipdPrescriptions,
  ipdPrescription,
  createIpdPrescription,
  updateIpdPrescription,
  deleteIpdPrescription,
} from './ipdPrescriptions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdPrescriptions', () => {
  scenario('returns all ipdPrescriptions', async (scenario) => {
    const result = await ipdPrescriptions()

    expect(result.length).toEqual(Object.keys(scenario.ipdPrescription).length)
  })

  scenario('returns a single ipdPrescription', async (scenario) => {
    const result = await ipdPrescription({
      id: scenario.ipdPrescription.one.id,
    })

    expect(result).toEqual(scenario.ipdPrescription.one)
  })

  scenario('creates a ipdPrescription', async (scenario) => {
    const result = await createIpdPrescription({
      input: {
        ipdId: scenario.ipdPrescription.two.ipdId,
        medicine: 'String',
        dosage: 'String',
        timing: 'String',
        frequency: 'String',
        duration: 'String',
        note: 'String',
        quantity: 1998002,
        updated_at: '2023-11-22T06:38:12.122Z',
        medicineId: scenario.ipdPrescription.two.medicineId,
      },
    })

    expect(result.ipdId).toEqual(scenario.ipdPrescription.two.ipdId)
    expect(result.medicine).toEqual('String')
    expect(result.dosage).toEqual('String')
    expect(result.timing).toEqual('String')
    expect(result.frequency).toEqual('String')
    expect(result.duration).toEqual('String')
    expect(result.note).toEqual('String')
    expect(result.quantity).toEqual(1998002)
    expect(result.updated_at).toEqual(new Date('2023-11-22T06:38:12.122Z'))
    expect(result.medicineId).toEqual(scenario.ipdPrescription.two.medicineId)
  })

  scenario('updates a ipdPrescription', async (scenario) => {
    const original = await ipdPrescription({
      id: scenario.ipdPrescription.one.id,
    })
    const result = await updateIpdPrescription({
      id: original.id,
      input: { medicine: 'String2' },
    })

    expect(result.medicine).toEqual('String2')
  })

  scenario('deletes a ipdPrescription', async (scenario) => {
    const original = await deleteIpdPrescription({
      id: scenario.ipdPrescription.one.id,
    })
    const result = await ipdPrescription({ id: original.id })

    expect(result).toEqual(null)
  })
})
