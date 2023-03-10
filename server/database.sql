-- CREATE TABLE to-do-list
CREATE TABLE "to_do"(
	"id" SERIAL PRIMARY KEY,
	"isCompleted" BOOLEAN DEFAULT false,
	"task" VARCHAR(500) NOT NULL
);

-- Create mock data
INSERT INTO "to_do" ("task")
VALUES ('Do dishes'),
('Get groceries'),
('Clean kitchen'),
('Make dinner'),
('Do laundry'),
('Complete assignment'),
('Shovel the driveway');

-- GET table data
SELECT * FROM "to_do";

-- POST row to TABLE
INSERT INTO "to_do" ("task")
VALUES ($1);

-- PUT change isCompleted to true
UPDATE "to_do" 
SET "isCompleted" = TRUE
WHERE "id" = $1;

-- DELETE a task from the TABLE
DELETE FROM "to_do"
WHERE ID = $1;