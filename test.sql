CREATE DATABASE `sport_information_system`;

-- Table structure for table `person`
--

CREATE TABLE `person` (
  `NIC` varchar(12) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `street_no` int(50) NOT NULL,
  `street` int(50) NOT NULL,
  `city` int(50) NOT NULL,
  `state` int(20) NOT NULL,
  `zip` varchar(4) NOT NULL,
  PRIMARY KEY (`NIC`)
) ;

-- Table structure for table `administration`


CREATE TABLE `administration` (
  `NIC` varchar(12) NOT NULL,
  `salary` float NOT NULL,
  `post` varchar(20) NOT NULL,
  PRIMARY KEY (`NIC`),
  FOREIGN KEY (`NIC`) REFERENCES `person` (`NIC`)
) ;

-- Table structure for table `couch`

CREATE TABLE `couch` (
  `NIC` varchar(12) NOT NULL,
  `assigned_time_period` varchar(10) NOT NULL,
  `salary` float NOT NULL,
  `start_date` date NOT NULL,
  `couch_id` varchar(12) NOT NULL,
    UNIIQUE (`NIC`),
  PRIMARY KEY (`couch_id`),
  FOREIGN KEY (`NIC`) REFERENCES `person` (`NIC`)
);

-- Table structure for table `sportsman`

CREATE TABLE `sportsman` (
  `NIC` varchar(12) NOT NULL,
  `sportsman_id` varchar(12) NOT NULL,
  `sport_id` varchar(12) NOT NULL,
  `height` float CHECK (height>=1.0),
  `weight` float CHECK (weight>=40.0),
    UNIIQUE (`NIC`),
    PRIMARY KEY (`sportsman_id`),
    FOREIGN KEY (`NIC`) REFERENCES `person` (`NIC`),
    FOREIGN KEY (`sport_id`) REFERENCES `sport` (`sport_id`)  
);

-- Table structure for table `sport`

CREATE TABLE `sport` (  
  `sport_id` varchar(12) NOT NULL,
  `category` varchar(20) NOT NULL,
   PRIMARY KEY (`sport_id`)
);

-- Table structure for table `equipment`

CREATE TABLE `equipment` (
  `invoice_no` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `buying_date` date NOT NULL,
  `price` float NOT NULL,
    PRIMARY KEY (`invoice_no`)
);

-- Table structure for table `tournament`

CREATE TABLE `tournament` (
  `tournament_id` varchar(12) NOT NULL,
  `date` date NOT NULL,
  `venue` varchar(25) NOT NULL,
  PRIMARY KEY (`tournament_id`)
);

-- Table structure for table `team`

CREATE TABLE `team` (
  `team_id` varchar(12) NOT NULL,
  `name` varchar(25) NOT NULL,
  `categoty` varchar(25) NOT NULL,
  PRIMARY KEY (`team_id`)
);

-- Table structure for table `individual_sport`

CREATE TABLE `individual_sport` (
  `sport_id` varchar(12) NOT NULL,
  `name` varchar(20) NOT NULL,
    PRIMARY KEY (`sport_id`),
    FOREIGN KEY (`sport_id`) REFERENCES `sport` (`sport_id`)
);

-- Table structure for table `practice_session`

CREATE TABLE `practice_session` (
  `session_id` varchar(12) NOT NULL,
  `date` date NOT NULL,
  `venue` varchar(20) NOT NULL,
  `time` time NOT NULL,
  `sport_id` varchar(12) NOT NULL,
  `couch_id` varchar(12) NOT NULL,
    PRIMARY KEY (`session_id`),
    FOREIGN KEY (`sport_id`) REFERENCES `sport` (`sport_id`),
    FOREIGN KEY (`couch_id`) REFERENCES `couch` (`couch_id`)
);

-- Table structure for table `practce_attendance`

CREATE TABLE `practce_attendance` (
  `date` date NOT NULL,
  `time` time NOT NULL,
  `session_id` varchar(12) NOT NULL,
  `sportsman_id` varchar(12) NOT NULL,
    FOREIGN KEY (`session_id`) REFERENCES `practice_session` (`session_id`),
    FOREIGN KEY (`sportsman_id`) REFERENCES `sportsman` (`sportsman_id`)  
);

-- Table structure for table `sportsman_couch`

CREATE TABLE `sportsman_couch` (
  `couch_id` varchar(12) NOT NULL,
  `sportsman_id` varchar(12) NOT NULL,
    FOREIGN KEY (`couch_id`) REFERENCES `couch` (`couch_id`),
    FOREIGN KEY (`sportsman_id`) REFERENCES `sportsman` (`sportsman_id`)
);

-- Table structure for table `take_equipments`

CREATE TABLE `take_equipments` (
  `invoice_no` varchar(30) NOT NULL,
  `sportsman_id` varchar(12) NOT NULL,
    FOREIGN KEY (`invoice_no`) REFERENCES `equipment` (`invoice_no`),
    FOREIGN KEY (`sportsman_id`) REFERENCES `sportsman` (`sportsman_id`)

);





-- Table structure for table `team_member`
--

CREATE TABLE `team_member` (
  `sportsman_id` varchar(12) NOT NULL,
  `team_id` varchar(12) NOT NULL,
    FOREIGN KEY (`sportsman_id`) REFERENCES `sportsman` (`sportsman_id`)
    FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)

) ;


-- Table structure for table `team_participation`
--

CREATE TABLE `team_participation` (
  `tournament_id` varchar(12) NOT NULL,
  `team_id` varchar(12) NOT NULL,
  `rank` int(4) NOT NULL,
  `points` float NOT NULL,
    FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
    FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`)

) ;


-- Table structure for table `team_sports`
--

CREATE TABLE `team_sports` (
  `sport_id` varchar(12) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`sport_id`),
    FOREIGN KEY (`sport_id`) REFERENCES `sport` (`sport_id`)

) ;


