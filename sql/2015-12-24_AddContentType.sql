use media;

alter table `uploaded_media` add column `contentType` varchar(50) default null;
