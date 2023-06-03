export const schema = gql`
  type Patient {
    id: Int!
    name: String!
    age: Int!
    phone_no: String
    gender: String
    address: String
    created_at: DateTime!
    updated_at: DateTime!
    Opd: [Opd]!
    Ipd: [Ipd]!
    SaleMedicine: [SaleMedicine]!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: Int!): Patient @requireAuth
  }

  input CreatePatientInput {
    name: String!
    age: Int!
    phone_no: String
    gender: String
    address: String
  }

  input UpdatePatientInput {
    name: String
    age: Int
    phone_no: String
    gender: String
    address: String
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient! @requireAuth
    updatePatient(id: Int!, input: UpdatePatientInput!): Patient! @requireAuth
    deletePatient(id: Int!): Patient! @requireAuth
  }
`
