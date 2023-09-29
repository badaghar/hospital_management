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
    birthCertificates: [BirthCertificate!]! @skipAuth
    birthCertificate(id: Int!): BirthCertificate @skipAuth
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
