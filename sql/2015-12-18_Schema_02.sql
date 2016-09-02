use media;

create table if not exists `media_type` (
	`id` int not null auto_increment primary key,
	`name` varchar(40) not null
);

create table if not exists `uploaded_media` (
	`id` int not null auto_increment primary key,
	`typeId` int not null,
	`slug` char(6) not null,
	`filename` varchar(20) default null,
	`content` text default null,
	`hits` int not null default 0,
	foreign key (`typeId`) references `media_type`(`id`)
);

create table if not exists `users` (
	`id` int not null auto_increment primary key,
	`name` varchar(50) not null,
	`apiKey` char(40) not null
);
