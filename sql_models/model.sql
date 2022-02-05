create table users(
    id serial not null primary key,
    name varchar(32) not null,
    lastname varchar(32) not null,
    password varchar(32) not null ,
    phone1 varchar(12) not null,
    role int not null,
    phone2 varchar(12) not null,
    age int not null,
    group_id int  references groups(id) on delete cascade,
    archive boolean default true  not null
);

insert into users(name,lastname,password,phone1,phone2,role,age,group_id,archive) values();

create table direction(
     id serial not null primary key,
     name varchar(64) not null
);

create table teachers(
    id serial not null primary key,
    name varchar(64) not null,
    lastname varchar(64) not null,
    role int not null,
    phone varchar(12) not null,
    direction int references direction(id) on delete cascade
);

create table groups(
    id serial not null primary key,
    name varchar(64),
    teacher_id int references teachers(id) on delete cascade,
    direction int not null  references  direction(id) on delete cascade,
    archive boolean not null ,
    create_at date not null ,
    deleted_at date  ,
    active date not null
);

create table attendance(
      id serial not null,
      date date not null ,
      participate boolean not null ,
      teacher_id int not null references teachers(id) on delete cascade,
      student_id int not null references users(id) on delete cascade,
      ball int not null
);

create table tolov_tizimlari(
  id serial not null primary key,
  name varchar(32) not null
);

create table paid(
      id serial not null primary key,
      tolov_tizimi int  not null references tolov_tizimlari(id) on delete cascade,
      user_id int not null references users(id) on delete cascade,
      date date ,
      amount int ,
      debt int ,
      term date
);
create table courses(
   id serial primary key,
   date date,
   name varchar(64)
);
create table participent(
   id serial,
   phone varchar(12),
   course_id int references courses(id) on delete cascade,
   name varchar(64)
);

create table anonymous_chat(
   id serial primary key not null,
   message varchar(2048) not null
);
