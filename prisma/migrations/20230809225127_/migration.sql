-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "deadlineDate" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_projects" ("client", "deadlineDate", "id", "name", "priority", "userId") SELECT "client", "deadlineDate", "id", "name", "priority", "userId" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
