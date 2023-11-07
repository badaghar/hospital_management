export const schema = gql`
  type IpdPrescription {
    id: Int!
    ipd: Ipd!
    ipdId: Int!
    medicine: String!
    dosage: String!
    timing: String!
    frequency: String!
    duration: String!
    note: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    ipdPrescriptions: [IpdPrescription!]! @requireAuth
    ipdPrescription(id: Int!): IpdPrescription @requireAuth
  }

  input CreateIpdPrescriptionInput {
    ipdId: Int!
    medicine: String!
    dosage: String!
    timing: String!
    frequency: String!
    duration: String!
    note: String!
    extra: JSON
  }

  input UpdateIpdPrescriptionInput {
    ipdId: Int
    medicine: String
    dosage: String
    timing: String
    frequency: String
    duration: String
    note: String
    created_at: DateTime
    updated_at: DateTime
    extra: JSON
  }

  type Mutation {
    createIpdPrescription(input: [CreateIpdPrescriptionInput]!): IpdPrescription
      @requireAuth
    updateIpdPrescription(
      id: Int!
      input: UpdateIpdPrescriptionInput!
    ): IpdPrescription! @requireAuth
    deleteIpdPrescription(id: Int!): IpdPrescription! @requireAuth
  }
`
