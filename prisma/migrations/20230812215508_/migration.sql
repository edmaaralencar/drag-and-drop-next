/*
  Warnings:

  - Added the required column `isGroup` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_conversations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastMessageAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "isGroup" BOOLEAN NOT NULL
);
INSERT INTO "new_conversations" ("id", "lastMessageAt", "name") SELECT "id", "lastMessageAt", "name" FROM "conversations";
DROP TABLE "conversations";
ALTER TABLE "new_conversations" RENAME TO "conversations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
