BEGIN;

insert into blogful_articles
	(title, content, date_published)
	values
		('happy', 'blahsdlfk', now() - '1 days'::INTERVAL),
		('sad', 'asdlkfja;lsdkjf', now() - '2 days'::INTERVAL),
		('crazy', 'cxkcjakjsd', now() - '3 days'::INTERVAL),
		('blind', 'xcvvvvddf', now() - '4 days'::INTERVAL),
		('deaf', 'asdadfagrt', now() - '5 days'::INTERVAL),
		('irritable', 'alksdfj;oiausdfoi', now() - '6 days'::INTERVAL),
		('slap-happy', 'asfdslkjdfklasj', now() - '7 days'::INTERVAL),
		('hungry', 'nvbnfnhfh', now() - '8 days'::INTERVAL),
		('thirsty', 'blahsdlfk', now() - '9 days'::INTERVAL),
		('angry', 'jfghjfjhgjh', now() - '10 days'::INTERVAL),
		('tired', 'jfhfjhjhhgjfj', now() - '11 days'::INTERVAL),
		('chipper', 'chodelife', now() - '12 days'::INTERVAL),
		('young', 'jhfjfghjfhj', now() - '13 days'::INTERVAL),
		('strange', 'fdgdhfghjjgdh', now() - '14 days'::INTERVAL),
		('egotistic', 'hdfghdfgh', now() - '15 days'::INTERVAL),
		('humble', '4', now() - '16 days'::INTERVAL),
		('fancy', 'dfghtdtuty', now() - '17 days'::INTERVAL),
		('terrifying', 'vbgh', now() - '18 days'::INTERVAL),
		('relaxed', 'burgerking', now() - '19 days'::INTERVAL),
		('clumsy', 'fghjt', now() - '20 days'::INTERVAL);

		COMMIT;