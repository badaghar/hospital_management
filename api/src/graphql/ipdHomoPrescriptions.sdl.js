export const schema = gql`
  type IpdHomoPrescription {
    id: Int!
    ipd: Ipd!
    ipdId: Int!
    medicine: String!
    dosage: String!
    timing: String!
    frequency: String!
    duration: String!
    note: String
    rate: Int!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    ipdHomoPrescriptions: [IpdHomoPrescription!]! @requireAuth
    ipdHomoPrescription(id: Int!): IpdHomoPrescription @requireAuth
  }

  input CreateIpdHomoPrescriptionInput {
    ipdId: Int!
    medicine: String!
    dosage: String!
    timing: String!
    frequency: String!
    duration: String!
    note: String
    rate: Int!
    extra: JSON
  }

  input UpdateIpdHomoPrescriptionInput {
    ipdId: Int
    medicine: String
    dosage: String
    timing: String
    frequency: String
    duration: String
    note: String
    rate: Int
    extra: JSON
  }

  type Mutation {
    createIpdHomoPrescription(
      input: [CreateIpdHomoPrescriptionInput]!
    ): IpdHomoPrescription @requireAuth
    updateIpdHomoPrescription(
      id: Int!
      input: UpdateIpdHomoPrescriptionInput!
    ): IpdHomoPrescription! @requireAuth
    deleteIpdHomoPrescription(id: Int!): IpdHomoPrescription! @requireAuth
  }
`
