
INSERT INTO shopping_list (name, price, category, checked, date_added)
VALUES
		('snail',1.23,'Main',false,now()-'4 days'::INTERVAL),
    ('meow',3.43,'Snack',true,now()-'2 days'::INTERVAL),
    ('gary',4.32,'Breakfast',false,now()-'4 days'::INTERVAL),
    ('sponge',0.98,'Breakfast',true,now()-'5 days'::INTERVAL);