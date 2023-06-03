import {
  ipdConsultations,
  ipdConsultation,
  createIpdConsultation,
  updateIpdConsultation,
  deleteIpdConsultation,
} from './ipdConsultations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdConsultations', () => {
  scenario('returns all ipdConsultations', async (scenario) => {
    const result = await ipdConsultations()

    expect(result.length).toEqual(Object.keys(scenario.ipdConsultation).length)
  })

  scenario('returns a single ipdConsultation', async (scenario) => {
    const result = await ipdConsultation({
      id: scenario.ipdConsultation.one.id,
    })

    expect(result).toEqual(scenario.ipdConsultation.one)
  })

  scenario('creates a ipdConsultation', async (scenario) => {
    const result = await createIpdConsultation({
      input: {
        consultation_doctor: 'String',
        consultation_type: 'String',
        amount: 364303.45496961667,
        ipdId: scenario.ipdConsultation.two.ipdId,
        updated_at: '2023-06-02T13:16:34.344Z',
      },
    })

    expect(result.consultation_doctor).toEqual('String')
    expect(result.consultation_type).toEqual('String')
    expect(result.amount).toEqual(364303.45496961667)
    expect(result.ipdId).toEqual(scenario.ipdConsultation.two.ipdId)
    expect(result.updated_at).toEqual(new Date('2023-06-02T13:16:34.344Z'))
  })

  scenario('updates a ipdConsultation', async (scenario) => {
    const original = await ipdConsultation({
      id: scenario.ipdConsultation.one.id,
    })
    const result = await updateIpdConsultation({
      id: original.id,
      input: { consultation_doctor: 'String2' },
    })

    expect(result.consultation_doctor).toEqual('String2')
  })

  scenario('deletes a ipdConsultation', async (scenario) => {
    const original = await deleteIpdConsultation({
      id: scenario.ipdConsultation.one.id,
    })
    const result = await ipdConsultation({ id: original.id })

    expect(result).toEqual(null)
  })
})
