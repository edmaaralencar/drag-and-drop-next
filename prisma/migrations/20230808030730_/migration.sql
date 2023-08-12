/*
  Warnings:

  - Added the required column `date` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "payment_method" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "payments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payments" ("id", "projectId") SELECT "id", "projectId" FROM "payments";
DROP TABLE "payments";
ALTER TABLE "new_payments" RENAME TO "payments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
