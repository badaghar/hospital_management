export const schema = gql`
  type Ipd {
    id: Int!
    patient: Patient!
    consultant_doctor: String!
    date_of_admission: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    paid_amount: Float!
    Operation: [Operation]!
    IpdCharges: [IpdCharges]!
    IpdConsultation: [IpdConsultation]!
    IpdPayment: [IpdPayment]!
    patientId: Int!
  }

  type Query {
    ipds: [Ipd!]! @requireAuth
    ipd(id: Int!): Ipd @requireAuth
  }

  input CreateIpdInput {
    consultant_doctor: String!
    date_of_admission: DateTime!
    paid_amount: Float!
    patientId: Int!
    extra_data: JSON!
  }

  input UpdateIpdInput {
    consultant_doctor: String
    date_of_admission: DateTime
    paid_amount: Float
    patientId: Int
  }

  type Mutation {
    createIpd(input: CreateIpdInput!): Ipd! @requireAuth
    updateIpd(id: Int!, input: UpdateIpdInput!): Ipd! @requireAuth
    deleteIpd(id: Int!): Ipd! @requireAuth
  }
`
