-- CreateTable
CREATE TABLE `Device` (
    `imei` VARCHAR(191) NOT NULL,
    `clientid` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `purchase_date` DATETIME(3) NOT NULL,
    `guarantee` INTEGER NOT NULL,
    `nb_retour_sav` INTEGER NOT NULL,
    `insured` INTEGER NOT NULL,

    PRIMARY KEY (`imei`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_clientid_fkey` FOREIGN KEY (`clientid`) REFERENCES `Client`(`cin`) ON DELETE RESTRICT ON UPDATE CASCADE;
