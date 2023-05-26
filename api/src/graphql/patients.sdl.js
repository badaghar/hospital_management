export const schema = gql`
  type Patient {
    id: Int!
    name: String!
    age: Int!
    phone_no: String!
    gender: String!
    address: String
    did: DoctorFee
    doctorFeeId: Int
    date_of_admission: DateTime
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: Int!): Patient @requireAuth
  }

  input CreatePatientInput {
    name: String!
    age: Int!
    phone_no: String!
    gender: String!
    address: String
    doctorFeeId: Int
    date_of_admission: DateTime
  }

  input UpdatePatientInput {
    name: String
    age: Int
    phone_no: String
    gender: String
    address: String
    doctorFeeId: Int
    date_of_admission: DateTime
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient! @requireAuth
    updatePatient(id: Int!, input: UpdatePatientInput!): Patient! @requireAuth
    deletePatient(id: Int!): Patient! @requireAuth
  }
`
