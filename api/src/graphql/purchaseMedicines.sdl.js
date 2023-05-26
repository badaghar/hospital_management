export const schema = gql`
  type PurchaseMedicine {
    id: Int!
    invoiceNo: String!
    did: Distributer!
    distributerId: Int!
    date: DateTime!
    medicine: JSON!
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }


  type Query {
    purchaseMedicines: [PurchaseMedicine!]! @requireAuth
    purchaseMedicine(id: Int!): PurchaseMedicine @requireAuth
    checkInvoiceNumber(invoiceNo:String!): PurchaseMedicine @requireAuth
  }

  input CreatePurchaseMedicineInput {
    invoiceNo: String!
    distributerId: Int!
    date: DateTime!
    medicine: JSON!
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    permedicine: [CreateMedicineInput]!
  }

  input UpdatePurchaseMedicineInput {
    invoiceNo: String
    distributerId: Int
    date: DateTime
    medicine: JSON
    total: Float
    discount: Float
    sgst: Float
    cgst: Float
    grand_total: Float
    permedicine: [CreateMedicineInput]
  }


  type Mutation {
    createPurchaseMedicine(
      input: CreatePurchaseMedicineInput!
    ): PurchaseMedicine! @requireAuth
    updatePurchaseMedicine(
      id: Int!
      input: UpdatePurchaseMedicineInput!
    ): PurchaseMedicine! @requireAuth
    deletePurchaseMedicine(id: Int!): PurchaseMedicine! @requireAuth
  }
`
