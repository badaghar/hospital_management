/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Charges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Composition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Distributer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Manufacturer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Charges_name_key` ON `Charges`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Composition_name_key` ON `Composition`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Distributer_name_key` ON `Distributer`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Manufacturer_name_key` ON `Manufacturer`(`name`);
