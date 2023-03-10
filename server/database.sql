-- CREATE TABLE to-do-list
CREATE TABLE "to-do-list"(
	"id" SERIAL PRIMARY KEY,
	"isCompleted" BOOLEAN DEFAULT false,
	"task" VARCHAR(500) NOT NULL
);

-- Create mock data
INSERT INTO "to-do-list" ("task")
VALUES ('Do dishes'),
('Get groceries'),
('Clean kitchen'),
('Make dinner'),
('Do laundry'),
('Complete assignment'),
('Shovel the driveway');

-- GET table data
SELECT * FROM "to-do-list";

-- POST row to TABLE
INSERT INTO "to-do-list" ("task")
VALUES ($1);

-- PUT change isCompleted to true
UPDATE "to-do-list" 
SET "isCompleted" = TRUE
WHERE "id" = $1;

-- DELETE a task from the TABLE
DELETE FROM "to-do-list"
WHERE ID = 2;