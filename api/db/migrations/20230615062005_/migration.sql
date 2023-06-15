-- CreateTable
CREATE TABLE `ManufacturerPurchaseMedicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `batch` VARCHAR(191) NOT NULL,
    `paid_qty` INTEGER NOT NULL,
    `free_qty` INTEGER NOT NULL,
    `pack` INTEGER NOT NULL,
    `exp` DATETIME(3) NOT NULL,
    `mrp` DOUBLE NOT NULL,
    `rate` DOUBLE NOT NULL,
    `dis` DOUBLE NOT NULL,
    `sgst` DOUBLE NOT NULL,
    `cgst` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `net_amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ManufacturerPurchaseMedicine` ADD CONSTRAINT `ManufacturerPurchaseMedicine_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
