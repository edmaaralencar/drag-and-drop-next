/*
  Warnings:

  - Added the required column `name` to the `project_members_invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `project_members_invitations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_project_members_invitations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "project_members_invitations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_project_members_invitations" ("id", "projectId", "status", "userEmail") SELECT "id", "projectId", "status", "userEmail" FROM "project_members_invitations";
DROP TABLE "project_members_invitations";
ALTER TABLE "new_project_members_invitations" RENAME TO "project_members_invitations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
