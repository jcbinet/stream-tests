# Stream tests


## CSV Setup
Generate a .csv of 100000 rows

```bash
$ ./generate-csv.sh
```

## MySQL Docker Setup

```bash
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST="%" --restart on-failure -d -p 3306:3306 mysql/mysql-server:5.7
```

Connect to database, create a schema named `test` and run the following commands in the `test` schema:

```sql
create table data
(
    uuid VARCHAR(36) not null,
    number1 int default 1 not null,
    number2 int default 2 not null,
    number3 int default 3 not null,
    number4 int default 4 not null,
    number5 int default 5 not null,
    number6 int default 6 not null,
    number7 int default 7 not null,
    number8 int default 8 not null
);

create unique index data_uuid_uindex
    on data (uuid);

alter table data
    add constraint data_pk
        primary key (uuid);

create procedure insertIntoData(p1 int)
begin
    set @x = 0;
    repeat
        insert into data (uuid)
        values (uuid());
        set @x = @x + 1;
    until @x > p1 end repeat;
end


call insertIntoData(100000)
```
