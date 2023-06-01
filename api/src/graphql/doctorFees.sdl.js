export const schema = gql`
  type DoctorFee {
    id: Int!
    type: String!
    amount: Float!
    did: User!
    userId: Int!
    created_at: DateTime!
    updated_at: DateTime!
    Patient: [Patient]!
  }

  type Query {
    doctorFees: [DoctorFee!]! @requireAuth
    doctorFee(id: Int!): DoctorFee @requireAuth
  }

  input CreateDoctorFeeInput {
    type: String!
    amount: Float!
    userId: Int!
  }

  input UpdateDoctorFeeInput {
    type: String
    amount: Float
    userId: Int
  }

  type Mutation {
    createDoctorFee(input: CreateDoctorFeeInput!): DoctorFee! @requireAuth
    updateDoctorFee(id: Int!, input: UpdateDoctorFeeInput!): DoctorFee!
      @requireAuth
    deleteDoctorFee(id: Int!): DoctorFee! @requireAuth
  }
`
