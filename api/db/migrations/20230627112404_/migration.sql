/*
  Warnings:

  - You are about to drop the column `date` on the `ipdoperationpayment` table. All the data in the column will be lost.
  - You are about to drop the column `operation_doctor` on the `ipdoperationpayment` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `ipdoperationpayment` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `ipdoperationpayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ipdoperationpayment` DROP COLUMN `date`,
    DROP COLUMN `operation_doctor`,
    DROP COLUMN `remark`,
    DROP COLUMN `result`;
