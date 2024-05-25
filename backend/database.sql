CREATE TABLE Account (
    User_ID SERIAL PRIMARY KEY,
    User_Role VARCHAR(8),
    User_Gender VARCHAR(6),
    User_Pic VARCHAR,
    Firstname VARCHAR(50),
    Lastname VARCHAR(50),
    Birthday DATE,
    Tel VARCHAR(10),
    Email VARCHAR(100) UNIQUE,
    Pass VARCHAR(100) ,
    Description VARCHAR(500)
);

CREATE TABLE Room (
    Room_ID SERIAL PRIMARY KEY ,
    Room_Type VARCHAR(20),
    Room_Size VARCHAR(3),
    Room_Ratio FLOAT
);

CREATE TABLE Job (
    Job_ID SERIAL PRIMARY KEY ,
    Job_Name VARCHAR(20)
);

CREATE TABLE Address (
    Add_ID SERIAL PRIMARY KEY ,
    User_ID SMALLINT,
    Latitude SMALLINT,
    Longitude SMALLINT,
    Address VARCHAR(500),
    FOREIGN KEY (User_ID) REFERENCES Account(User_ID)
);

CREATE TABLE Rating (
    User_ID SMALLINT PRIMARY KEY,
    Avg_Rate FLOAT,
    FOREIGN KEY (User_ID) REFERENCES Account(User_ID)
);

CREATE TABLE Review (
    Review_ID SERIAL PRIMARY KEY ,
    Maid_ID SMALLINT,
    Customer_ID SMALLINT,
    Star SMALLINT,
    Comment VARCHAR(500),
    FOREIGN KEY (Maid_ID) REFERENCES Account(User_ID),
    FOREIGN KEY (Customer_ID) REFERENCES Account(User_ID)
);

CREATE TABLE Invoice (
    Invoice_ID SERIAL PRIMARY KEY ,
    Customer_ID SMALLINT,
    Maid_ID SMALLINT,
    Room_ID SMALLINT,
    Review_ID SMALLINT,
    Status VARCHAR(8),
    Work_Date DATE,
    Start_Time TIME,
    Work_Time SMALLINT,
    Submit_Time TIME DEFAULT CURRENT_TIME,
    Amount FLOAT,
    FOREIGN KEY (Customer_ID) REFERENCES Account(User_ID),
    FOREIGN KEY (Maid_ID) REFERENCES Account(User_ID),
    FOREIGN KEY (Room_ID) REFERENCES Room(Room_ID),
    FOREIGN KEY (Review_ID) REFERENCES Review(Review_ID)
);

CREATE TABLE UserJob (
    User_ID SMALLINT,
    Job_ID SMALLINT,
    PRIMARY KEY (User_ID, Job_ID),
    FOREIGN KEY (User_ID) REFERENCES Account(User_ID),
    FOREIGN KEY (Job_ID) REFERENCES Job(Job_ID)
);


CREATE TABLE InvoiceJob (
    Invoice_ID SERIAL ,
    Job_ID SERIAL ,
    FOREIGN KEY (Invoice_ID) REFERENCES Invoice(Invoice_ID),
    FOREIGN KEY (Job_ID) REFERENCES Job(Job_ID)
);

SELECT setval('account_user_id_seq', COALESCE((SELECT MAX(user_id) + 1 FROM account), 1), false);
SELECT setval('address_add_id_seq', COALESCE((SELECT MAX(add_id) + 1 FROM address), 1), false);
SELECT setval('job_job_id_seq', COALESCE((SELECT MAX(job_id) + 1 FROM job), 1), false);
SELECT setval('room_room_id_seq', COALESCE((SELECT MAX(room_id) + 1 FROM room), 1), false);
SELECT setval('review_review_id_seq', COALESCE((SELECT MAX(review_id) + 1 FROM review), 1), false);
SELECT setval('invoice_invoice_id_seq', COALESCE((SELECT MAX(invoice_id) + 1 FROM invoice), 1), false);

CREATE VIEW recommend_maid AS
SELECT
    m.user_id AS user_id,
    m.user_role AS user_role,
    MAX(a.latitude) AS latitude,
    MAX(a.longitude) AS longitude,
    MAX(CASE WHEN mj.Job_ID = 1 THEN 1 ELSE 0 END) AS job1,
    MAX(CASE WHEN mj.Job_ID = 2 THEN 1 ELSE 0 END) AS job2,
    MAX(CASE WHEN mj.Job_ID = 3 THEN 1 ELSE 0 END) AS job3,
    MAX(CASE WHEN mj.Job_ID = 4 THEN 1 ELSE 0 END) AS job4,
    MAX(CASE WHEN mj.Job_ID = 5 THEN 1 ELSE 0 END) AS job5,
    MAX(CASE WHEN mj.Job_ID = 6 THEN 1 ELSE 0 END) AS job6,
    MAX(CASE WHEN mj.Job_ID = 7 THEN 1 ELSE 0 END) AS job7,
    MAX(CASE WHEN mj.Job_ID = 8 THEN 1 ELSE 0 END) AS job8,
    MAX(CASE WHEN mj.Job_ID = 9 THEN 1 ELSE 0 END) AS job9,
    MAX(CASE WHEN mj.Job_ID = 10 THEN 1 ELSE 0 END) AS job10,
    (
        SELECT AVG(r.Avg_Rate)
        FROM Rating r
        WHERE r.User_ID = m.User_ID
    ) AS avg_rating
FROM Account m
LEFT JOIN UserJob mj ON m.User_ID = mj.User_ID
INNER JOIN Address a ON m.User_ID = a.User_ID
GROUP BY m.user_id, a.latitude, a.longitude
ORDER BY m.user_id;