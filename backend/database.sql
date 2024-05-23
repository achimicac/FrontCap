CREATE TABLE Account (
    User_ID SERIAL PRIMARY KEY,
    User_Role VARCHAR(8),
    User_Gender VARCHAR(6),
    User_Pic bytea,
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
    Maid_ID SMALLINT PRIMARY KEY,
    Avg_Rate    numeric ,
    FOREIGN KEY (Maid_ID) REFERENCES Account(User_ID)
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

CREATE TABLE MaidJob (
    Maid_ID SMALLINT,
    Job_ID SMALLINT,
    PRIMARY KEY (Maid_ID, Job_ID),
    FOREIGN KEY (Maid_ID) REFERENCES Account(User_ID),
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