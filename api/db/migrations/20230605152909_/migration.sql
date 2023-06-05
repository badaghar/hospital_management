-- DropForeignKey
ALTER TABLE `bed` DROP FOREIGN KEY `Bed_ipdId_fkey`;

-- AddForeignKey
ALTER TABLE `Bed` ADD CONSTRAINT `Bed_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `Ipd`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
