-- AlterTable
ALTER TABLE `bed` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `charges` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `composition` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `distributer` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `doctorfee` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `floor` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipd` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdcharges` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdchat` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdconsultation` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdlabcharges` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdoperationpayment` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdpayment` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `ipdsummary` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `labcharges` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `manufacturer` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `manufacturerpurchasemedicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `medicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `opd` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `operation` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `paymentpurchasemedicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `purchasemedicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `returnexpirymedicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `returnmedicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `salemedicine` ADD COLUMN `extra` JSON NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `extra` JSON NULL;
