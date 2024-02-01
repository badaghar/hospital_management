export const standard = defineScenario({
  ipdInvestigation: {
    one: {
      data: {
        lab_name: 'String',
        isWaiting: true,
        test_list: { foo: 'bar' },
        url: 'String',
        updated_at: '2024-02-01T16:41:09.921Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2024-02-01T16:41:09.921Z',
            updated_at: '2024-02-01T16:41:09.921Z',
            paid_amount: 4230594.913383534,
            patientType: 'String',
            isWaiting: true,
            patient: {
              create: {
                name: 'String',
                age: 6664665,
                updated_at: '2024-02-01T16:41:09.921Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        lab_name: 'String',
        isWaiting: true,
        test_list: { foo: 'bar' },
        url: 'String',
        updated_at: '2024-02-01T16:41:09.921Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2024-02-01T16:41:09.921Z',
            updated_at: '2024-02-01T16:41:09.921Z',
            paid_amount: 5832824.704293564,
            patientType: 'String',
            isWaiting: true,
            patient: {
              create: {
                name: 'String',
                age: 3796716,
                updated_at: '2024-02-01T16:41:09.921Z',
              },
            },
          },
        },
      },
    },
  },
})
