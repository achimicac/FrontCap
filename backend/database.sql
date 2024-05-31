create table account (
    user_id serial primary key,
    user_role varchar(8),
    user_gender varchar(6),
    user_pic varchar,
    firstname varchar(50),
    lastname varchar(50),
    birthday date,
    tel varchar(10),
    email varchar(100) unique,
    pass varchar(100) ,
    description varchar
);

create table room (
    room_id serial primary key ,
    room_type varchar(30),
    room_size varchar(3),
    room_ratio float
);

create table job (
    job_id serial primary key ,
    job_name varchar(20),
    job_weight float
);

create table address (
    add_id serial primary key ,
    user_id smallint,
    latitude smallint,
    longitude smallint,
    address varchar,
    foreign key (user_id) references account(user_id)
);

create table rating (
    user_id smallint primary key,
    avg_rate float,
    foreign key (user_id) references account(user_id)
);

create table review (
    review_id serial primary key ,
    maid_id smallint,
    customer_id smallint,
    star smallint,
    comment varchar,
    foreign key (maid_id) references account(user_id),
    foreign key (customer_id) references account(user_id)
);

create table invoice (
    invoice_id serial primary key ,
    customer_id smallint,
    maid_id smallint,
    room_id smallint,
    review_id smallint,
    status varchar(8),
    work_date date,
    start_time time,
    work_time smallint,
    end_time time default current_time,
    amount float,
    note varchar(120),
    foreign key (customer_id) references account(user_id),
    foreign key (maid_id) references account(user_id),
    foreign key (room_id) references room(room_id),
    foreign key (review_id) references review(review_id)
);

create table userjob (
    user_id smallint,
    job_id smallint,
    primary key (user_id, job_id),
    foreign key (user_id) references account(user_id),
    foreign key (job_id) references job(job_id)
);

create table invoicejob (
    invoice_id smallint ,
    job_id smallint ,
    primary key (invoice_id, job_id),
    foreign key (invoice_id) references invoice(invoice_id),
    foreign key (job_id) references job(job_id)
);

create table timeweight (
    room_id smallint ,
    job_id smallint ,
    time_weight smallint ,
    primary key (room_id, job_id),
    foreign key (room_id) references room(room_id),
    foreign key (job_id) references job(job_id)
);

create view recommend_maid as
select
    m.user_id as user_id,
    m.user_role as user_role,
    max(a.latitude) as latitude,
    max(a.longitude) as longitude,
    max(case when mj.job_id = 1 then 1 else 0 end) as job1,
    max(case when mj.job_id = 2 then 1 else 0 end) as job2,
    max(case when mj.job_id = 3 then 1 else 0 end) as job3,
    max(case when mj.job_id = 4 then 1 else 0 end) as job4,
    max(case when mj.job_id = 5 then 1 else 0 end) as job5,
    max(case when mj.job_id = 6 then 1 else 0 end) as job6,
    max(case when mj.job_id = 7 then 1 else 0 end) as job7,
    max(case when mj.job_id = 8 then 1 else 0 end) as job8,
    max(case when mj.job_id = 9 then 1 else 0 end) as job9,
    max(case when mj.job_id = 10 then 1 else 0 end) as job10,
    (
        select avg(r.avg_rate)
        from rating r
        where r.user_id = m.user_id
    ) as avg_rating
from account m
left join userjob mj on m.user_id = mj.user_id
inner join address a on m.user_id = a.user_id
group by m.user_id, a.latitude, a.longitude
order by m.user_id;

select setval('account_user_id_seq', coalesce((select max(user_id) + 1 from account), 1), false);
select setval('address_add_id_seq', coalesce((select max(add_id) + 1 from address), 1), false);
select setval('job_job_id_seq', coalesce((select max(job_id) + 1 from job), 1), false);
select setval('room_room_id_seq', coalesce((select max(room_id) + 1 from room), 1), false);
select setval('review_review_id_seq', coalesce((select max(review_id) + 1 from review), 1), false);
select setval('invoice_invoice_id_seq', coalesce((select max(invoice_id) + 1 from invoice), 1), false);