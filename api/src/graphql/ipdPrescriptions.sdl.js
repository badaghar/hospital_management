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
    quantity: Int!
    medicine_detail: Medicine!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    medicineId: Int!
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
    note: String
    quantity: Int!
    extra: JSON
    medicineId: Int!
  }

  input UpdateIpdPrescriptionInput {
    ipdId: Int
    medicine: String
    dosage: String
    timing: String
    frequency: String
    duration: String
    note: String
    quantity: Int
    extra: JSON
    medicineId: Int
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
