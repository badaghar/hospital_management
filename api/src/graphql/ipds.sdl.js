export const schema = gql`
  type Ipd {
    id: Int!
    patient: Patient!
    patientId: Int!
    consultant_doctor: String!
    date_of_admission: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    paid_amount: Float!
    discharge_date: DateTime
    patientType: String!
    IpdCharges: [IpdCharges]!
    IpdConsultation: [IpdConsultation]!
    IpdPayment: [IpdPayment]!
    Bed: [Bed]!
    IpdLabCharges: [IpdLabCharges]!
    IpdOperationPayment: [IpdOperationPayment]!
    IpdChat: [IpdChat]!
    IpdSummary: [IpdSummary]!
  }

  type Query {
    ipds(type: String!): [Ipd!]! @requireAuth
    ipd(id: Int!): Ipd @skipAuth
  }

  input CreateIpdInput {
    patientId: Int!
    consultant_doctor: String!
    date_of_admission: DateTime!

    paid_amount: Float!
    discharge_date: DateTime
    patientType: String!
    extra_data: JSON!
  }

  input UpdateIpdInput {
    patientId: Int
    consultant_doctor: String
    date_of_admission: DateTime
    paid_amount: Float
    discharge_date: DateTime
    patientType: String
  }



  type Mutation {
    createIpd(input: CreateIpdInput!): Ipd! @requireAuth
    updateIpd(id: Int!, input: UpdateIpdInput!): Ipd! @requireAuth
    deleteIpd(id: Int!): Ipd @requireAuth
    dischargePatient(id: Int!) : Ipd @requireAuth
    undischargePatient(id: Int!,bed: Int!) : Ipd @requireAuth
  }
`
