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

  # pharmacy Report
  type DistributerReportResponse {
  data: [PurchaseMedicine]!
  totalSum: Float!
}
  type SaleReport {
    data: [SaleMedicine]!
    totalSum: Float!
  }

  type PaymentReport {
    data: [PaymentPurchaseMedicine]!
    totalSum: Float!
  }

  type IpdReport {
    data: [Ipd]!
    totalSum: Float!
  }
  type OpdReport {
    data: [Opd]!
    totalSum: Float!
  }


  type Query {
    purchaseMedicines: [PurchaseMedicine!]! @requireAuth
    purchaseMedicine(id: Int!): PurchaseMedicine @requireAuth
    checkInvoiceNumber(invoiceNo:String!): [PurchaseMedicine]! @requireAuth
    # pharmacy Report
    distributersReport(id:Int!,startDate:String!,endDate:String!): DistributerReportResponse! @requireAuth
    purchaseReport(startDate:String!,endDate:String!): DistributerReportResponse! @requireAuth
    saleReport(startDate:String!,endDate:String!) : SaleReport! @requireAuth
    pharmacyPayment(id:Int!,startDate:String!,endDate:String!): PaymentReport! @requireAuth
    # hospital Report
    ipdReport(startDate:String!,endDate:String!) : IpdReport! @requireAuth
    opdReport(startDate:String!,endDate:String!) : OpdReport! @requireAuth

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
