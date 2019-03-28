create schema if not exists outingevents;
set schema 'outingevents';

CREATE TABLE IF NOT EXISTS Event(
	id integer NOT NULL PRIMARY KEY,
	type varchar NOT NULL,
	name varchar NOT NULL UNIQUE,
	location varchar NOT NULL,
	state varchar NOT NULL,
	survey_id integer,
	start_time timestamp NOT NULL,
	end_time timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS Survey_Question (
	id integer NOT NULL PRIMARY KEY,
	name varchar,
	event_id integer,
	questions json
);

CREATE TABLE IF NOT EXISTS Survey_Result (
	id integer NOT NULL PRIMARY KEY,
	survey_question_id integer NOT NULL,
	user_id integer NOT NULL,
	event_id integer NOT NULL,
	response json
);

CREATE TABLE IF NOT EXISTS CurrentUser (
	id integer NOT NULL PRIMARY KEY,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	email varchar NOT NULL,
	username varchar NOT NULL UNIQUE,
	password varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS Payment (
	id integer NOT NULL PRIMARY KEY,
	event_id integer NOT NULL,
	user_id integer NOT NULL,
	status varchar,
	description varchar NOT NULL,
	amount integer NOT NULL,
	currency varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Receipt (
	id integer NOT NULL PRIMARY KEY,
	event_id integer NOT NULL,
	vendor varchar,
	description varchar NOT NULL,
	amount integer NOT NULL,
	currency varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS Event_Participant (
	id integer NOT NULL PRIMARY KEY,
	event_id integer NOT NULL,
	user_id integer NOT NULL,
	is_organizer boolean DEFAULT false,
	notified boolean DEFAULT false,
	confirmed boolean DEFAULT false,
	attended boolean DEFAULT false,
	tooksurvey boolean DEFAULT false
);