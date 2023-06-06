export const schema = gql`
  type IpdConsultation {
    id: Int!
    consultation_doctor: String!
    consultation_type: String!
    amount: Float!
    ipd: Ipd!
    ipdId: Int!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    ipdConsultations: [IpdConsultation!]! @requireAuth
    ipdConsultation(id: Int!): IpdConsultation @requireAuth
  }

  input CreateIpdConsultationInput {
    consultation_doctor: String!
    consultation_type: String!
    amount: Float!
    ipdId: Int!
  }

  input UpdateIpdConsultationInput {
    consultation_doctor: String
    consultation_type: String
    amount: Float
    ipdId: Int
  }

  type Mutation {
    createIpdConsultation(input: [CreateIpdConsultationInput]!): IpdConsultation
      @requireAuth
    updateIpdConsultation(
      id: Int!
      input: UpdateIpdConsultationInput!
    ): IpdConsultation! @requireAuth
    deleteIpdConsultation(id: Int!): IpdConsultation! @requireAuth
  }
`
