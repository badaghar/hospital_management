export const schema = gql`
  type Opd {
    id: Int!
    consultant_doctor: String!
    charges: JSON!
    paymentMode: String!
    amount: Float!
    patient: Patient!
    created_at: DateTime!
    updated_at: DateTime!
    patientId: Int!
  }

  type Query {
    opds: [Opd!]! @requireAuth
    opd(id: Int!): Opd @requireAuth
  }

  input CreateOpdInput {
    consultant_doctor: String!
    charges: JSON!
    paymentMode: String!
    amount: Float!
    patientId: Int!
  }

  input UpdateOpdInput {
    consultant_doctor: String
    charges: JSON
    paymentMode: String
    amount: Float
    patientId: Int
  }

  type Mutation {
    createOpd(input: CreateOpdInput!): Opd! @requireAuth
    updateOpd(id: Int!, input: UpdateOpdInput!): Opd! @requireAuth
    deleteOpd(id: Int!): Opd! @requireAuth
  }
`
