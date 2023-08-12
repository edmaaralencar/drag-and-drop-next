-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_project_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "duedate" DATETIME NOT NULL,
    "index" INTEGER NOT NULL,
    "column" TEXT NOT NULL,
    CONSTRAINT "project_tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_project_tasks" ("column", "description", "duedate", "id", "index", "name", "projectId", "tag") SELECT "column", "description", "duedate", "id", "index", "name", "projectId", "tag" FROM "project_tasks";
DROP TABLE "project_tasks";
ALTER TABLE "new_project_tasks" RENAME TO "project_tasks";
CREATE TABLE "new_project_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "invitationId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "project_members_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "project_members_invitations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_members_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_project_members" ("id", "invitationId", "projectId", "userId") SELECT "id", "invitationId", "projectId", "userId" FROM "project_members";
DROP TABLE "project_members";
ALTER TABLE "new_project_members" RENAME TO "project_members";
CREATE TABLE "new_project_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "project_tags_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_project_tags" ("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "project_tags";
DROP TABLE "project_tags";
ALTER TABLE "new_project_tags" RENAME TO "project_tags";
CREATE TABLE "new_project_members_invitations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "project_members_invitations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_project_members_invitations" ("id", "name", "occupation", "projectId", "status", "userEmail") SELECT "id", "name", "occupation", "projectId", "status", "userEmail" FROM "project_members_invitations";
DROP TABLE "project_members_invitations";
ALTER TABLE "new_project_members_invitations" RENAME TO "project_members_invitations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
