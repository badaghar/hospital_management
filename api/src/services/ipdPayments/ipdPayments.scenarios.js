export const standard = defineScenario({
  ipdPayment: {
    one: {
      data: {
        amount: 6680910.675503529,
        payment_mode: 'String',
        updated_at: '2023-06-02T13:16:49.378Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-02T13:16:49.378Z',
            updated_at: '2023-06-02T13:16:49.378Z',
            paid_amount: 1346517.4143663105,
            patient: {
              create: {
                name: 'String',
                age: 9614968,
                updated_at: '2023-06-02T13:16:49.378Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        amount: 4441541.2744635185,
        payment_mode: 'String',
        updated_at: '2023-06-02T13:16:49.378Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-02T13:16:49.378Z',
            updated_at: '2023-06-02T13:16:49.378Z',
            paid_amount: 3420426.9789171196,
            patient: {
              create: {
                name: 'String',
                age: 2119415,
                updated_at: '2023-06-02T13:16:49.378Z',
              },
            },
          },
        },
      },
    },
  },
})
