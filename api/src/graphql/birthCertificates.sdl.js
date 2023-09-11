export const schema = gql`
  type BirthCertificate {
    id: Int!
    name: String!
    birth_date: DateTime!
    weight: Float
    type: Int!
    extra: JSON
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    birthCertificates: [BirthCertificate!]! @requireAuth
    birthCertificate(id: Int!): BirthCertificate @requireAuth
  }

  input CreateBirthCertificateInput {
    name: String!
    birth_date: DateTime!
    weight: Float
    type: Int!
    extra: JSON
  }

  input UpdateBirthCertificateInput {
    name: String
    birth_date: DateTime
    weight: Float
    type: Int
    extra: JSON
  }

  type Mutation {
    createBirthCertificate(
      input: CreateBirthCertificateInput!
    ): BirthCertificate! @requireAuth
    updateBirthCertificate(
      id: Int!
      input: UpdateBirthCertificateInput!
    ): BirthCertificate! @requireAuth
    deleteBirthCertificate(id: Int!): BirthCertificate! @requireAuth
  }
`
