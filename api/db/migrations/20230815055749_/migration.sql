-- CreateTable
CREATE TABLE `ReturnExpiryMedicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `distributerId` INTEGER NOT NULL,
    `medicine` JSON NOT NULL,
    `return_med` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
