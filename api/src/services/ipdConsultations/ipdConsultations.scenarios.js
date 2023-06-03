export const standard = defineScenario({
  ipdConsultation: {
    one: {
      data: {
        consultation_doctor: 'String',
        consultation_type: 'String',
        amount: 8271049.305710105,
        updated_at: '2023-06-02T13:16:34.355Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-02T13:16:34.355Z',
            updated_at: '2023-06-02T13:16:34.355Z',
            paid_amount: 9929006.598351274,
            patient: {
              create: {
                name: 'String',
                age: 5035794,
                updated_at: '2023-06-02T13:16:34.355Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        consultation_doctor: 'String',
        consultation_type: 'String',
        amount: 6489157.453269864,
        updated_at: '2023-06-02T13:16:34.355Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-02T13:16:34.355Z',
            updated_at: '2023-06-02T13:16:34.355Z',
            paid_amount: 700794.1774565584,
            patient: {
              create: {
                name: 'String',
                age: 4639486,
                updated_at: '2023-06-02T13:16:34.355Z',
              },
            },
          },
        },
      },
    },
  },
})
