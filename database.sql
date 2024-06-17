-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE IF NOT EXISTS "user" (
	"id" serial primary key,
	 "username" varChar(80) not null UNIQUE,
	"password" varChar(100) not null,
	"admin" boolean default false
);

CREATE TABLE IF NOT EXISTS "user_info" (
	"id" serial PRIMARY KEY,
    "user_id" int UNIQUE,
    "height" int NOT NULL,
    "weight" int NOT NULL,
    "age" int NOT NULL,
    "gender" varchar(10) NOT NULL,
    CHECK("gender" IN ('Male', 'Female')),
    "bmr" int NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
	
);

CREATE TABLE IF NOT EXISTS "musclegroups" (
	"id" serial primary key,
	"name" varchar(100) not null unique
);

CREATE TABLE IF NOT EXISTS "workout_log"(
	"id" serial primary key,
	"user_id" int references "user" ON DELETE CASCADE,
	"date" DATE not null
);

CREATE TABLE IF NOT EXISTS  "exercises"(
	"id" serial primary key,
	"name" varchar(100) not null unique,
--	"steps" varchar(2500) not null,
	"image_url" varchar(1000),
	"video_url" varchar(1000)
);

CREATE TABLE IF NOT EXISTS "steps"(
	"id" serial primary key,
	"exercise_id" int references "exercises",
	"step_number" varchar(100) not null,
	"description" varchar(100) not null
);


CREATE TABLE IF NOT EXISTS "workout_details"(
	"id" serial primary key,
	"workout_id" int references "workout_log" ON DELETE CASCADE,
	"exercise_id" int references "exercises" 
);

CREATE TABLE IF NOT EXISTS "set_info" (
    "id" SERIAL PRIMARY KEY,
    "detail_id" INT REFERENCES "workout_details" ON DELETE CASCADE,
    "set_number" INT NOT NULL,
    "reps" INT NOT NULL,
    "weight" DECIMAL NOT NULL
);


CREATE TABLE IF NOT EXISTS "calorie_log"(
	"id" serial primary key,
	"user_id" int references "user" ON DELETE CASCADE,
	"date" DATE not null
);

CREATE TABLE IF NOT EXISTS "cl_entry"(
	"entry_id" serial primary key,
	"log_id" int references "calorie_log" ON DELETE CASCADE,
	"food_name" varchar(100) not null,
	"calories" int not null,
	"protein" int,
	"carbs" int,
	"fats" int
);

CREATE TABLE IF NOT EXISTS "exercise_muscles" (
    "exercise_id" INT REFERENCES "exercises",
    "muscle_id" INT REFERENCES "musclegroups",
    PRIMARY KEY ("exercise_id", "muscle_id")
);

-- Seed Data:
INSERT INTO musclegroups ("name")
VALUES 
    ('Chest'),
    ('Biceps'), 
    ('Triceps'),
	('Core'),
    ('Shoulders'),
    ('Legs'),
    ('Calves'),
    ('Glutes'),
    ('Forearms'),
    ('Back');



INSERT INTO exercises (name, image_url) VALUES
('Bench Press', 'http://example.com/bench_press.jpg'),
('Deadlift', 'http://example.com/deadlift.jpg'),
('Squat', 'http://example.com/squat.jpg'),
('Overhead Press', 'http://example.com/overhead_press.jpg'),
('Barbell Row', 'http://example.com/barbell_row.jpg'),
('Pull-Up', 'http://example.com/pull_up.jpg'),
('Dumbbell Curl', 'http://example.com/dumbbell_curl.jpg'),
('Tricep Extension', 'http://example.com/tricep_extension.jpg'),
('Lateral Raise', 'http://example.com/lateral_raise.jpg'),
('Leg Press', 'http://example.com/leg_press.jpg'),
('Hamstring Curl', 'http://example.com/hamstring_curl.jpg'),
('Calf Raise', 'http://example.com/calf_raise.jpg'),
('Crunch', 'http://example.com/crunch.jpg'),
('Plank', 'http://example.com/plank.jpg'),
('Russian Twist', 'http://example.com/russian_twist.jpg'),
('Dumbbell Fly', 'http://example.com/dumbbell_fly.jpg'),
('Incline Bench Press', 'http://example.com/incline_bench_press.jpg'),
('Decline Bench Press', 'http://example.com/decline_bench_press.jpg'),
('Cable Fly', 'http://example.com/cable_fly.jpg'),
('Chest Dip', 'http://example.com/chest_dip.jpg'),
('Seated Row', 'http://example.com/seated_row.jpg'),
('Face Pull', 'http://example.com/face_pull.jpg'),
('Lat Pulldown', 'http://example.com/lat_pulldown.jpg'),
('Reverse Fly', 'http://example.com/reverse_fly.jpg'),
('Preacher Curl', 'http://example.com/preacher_curl.jpg');

INSERT INTO steps (exercise_id, step_number, description) VALUES
-- Bench Press Steps
(1, 1, 'Lie on a flat bench, feet flat on the floor.'),
(1, 2, 'Grip the bar with hands slightly wider than shoulder-width apart.'),
(1, 3, 'Lower the bar to your chest, then press it back up.'),

-- Deadlift Steps
(2, 1, 'Stand with feet hip-width apart, barbell over mid-foot.'),
(2, 2, 'Grip the bar just outside your knees.'),
(2, 3, 'Lift the bar by straightening your hips and knees.'),

-- Squat Steps
(3, 1, 'Stand with feet shoulder-width apart.'),
(3, 2, 'Lower your body by bending hips and knees.'),
(3, 3, 'Return to the starting position.'),

-- Overhead Press Steps
(4, 1, 'Stand with feet shoulder-width apart, barbell at your shoulders.'),
(4, 2, 'Press the bar overhead until your arms are straight.'),
(4, 3, 'Lower the bar back to your shoulders.'),

-- Barbell Row Steps
(5, 1, 'Stand with feet hip-width apart, bend at the waist with barbell in hands.'),
(5, 2, 'Pull the bar towards your lower chest.'),
(5, 3, 'Lower the bar back down.'),

-- Pull-Up Steps
(6, 1, 'Hang from a pull-up bar with hands shoulder-width apart.'),
(6, 2, 'Pull yourself up until your chin is above the bar.'),
(6, 3, 'Lower yourself back down.'),

-- Dumbbell Curl Steps
(7, 1, 'Stand with a dumbbell in each hand, arms at your sides.'),
(7, 2, 'Curl the dumbbells towards your shoulders.'),
(7, 3, 'Lower the dumbbells back down.'),

-- Tricep Extension Steps
(8, 1, 'Stand with feet shoulder-width apart, hold a dumbbell overhead.'),
(8, 2, 'Lower the dumbbell behind your head by bending your elbows.'),
(8, 3, 'Straighten your arms to return to the starting position.'),

-- Lateral Raise Steps
(9, 1, 'Stand with a dumbbell in each hand at your sides.'),
(9, 2, 'Lift the dumbbells out to the sides until they reach shoulder height.'),
(9, 3, 'Lower the dumbbells back down.'),

-- Leg Press Steps
(10, 1, 'Sit on the leg press machine with your feet shoulder-width apart on the platform.'),
(10, 2, 'Lower the platform until your knees are at a 90-degree angle.'),
(10, 3, 'Press the platform back up to the starting position.'),

-- Hamstring Curl Steps
(11, 1, 'Lie face down on the hamstring curl machine.'),
(11, 2, 'Curl your legs towards your buttocks.'),
(11, 3, 'Lower your legs back down.'),

-- Calf Raise Steps
(12, 1, 'Stand on the edge of a step with your heels hanging off.'),
(12, 2, 'Raise your heels as high as possible.'),
(12, 3, 'Lower your heels back down.'),

-- Crunch Steps
(13, 1, 'Lie on your back with your knees bent and feet flat on the floor.'),
(13, 2, 'Place your hands behind your head.'),
(13, 3, 'Lift your shoulders off the floor and squeeze your abs.'),
(13, 4, 'Lower your shoulders back down.'),

-- Plank Steps
(14, 1, 'Get into a push-up position with your weight on your forearms.'),
(14, 2, 'Keep your body in a straight line from head to heels.'),
(14, 3, 'Hold the position.'),

-- Russian Twist Steps
(15, 1, 'Sit on the floor with your knees bent and feet flat.'),
(15, 2, 'Lean back slightly and lift your feet off the floor.'),
(15, 3, 'Twist your torso to the right, then to the left.'),
(15, 4, 'Repeat the movement.'),

-- Dumbbell Fly Steps
(16, 1, 'Lie on a flat bench with a dumbbell in each hand, arms extended above your chest.'),
(16, 2, 'Lower the dumbbells out to the sides until they are level with your chest.'),
(16, 3, 'Bring the dumbbells back up to the starting position.'),

-- Incline Bench Press Steps
(17, 1, 'Lie on an incline bench with a barbell at your shoulders.'),
(17, 2, 'Press the barbell up until your arms are straight.'),
(17, 3, 'Lower the barbell back to your shoulders.'),

-- Decline Bench Press Steps
(18, 1, 'Lie on a decline bench with a barbell at your shoulders.'),
(18, 2, 'Press the barbell up until your arms are straight.'),
(18, 3, 'Lower the barbell back to your shoulders.'),

-- Cable Fly Steps
(19, 1, 'Stand between two cable machines with handles in each hand.'),
(19, 2, 'Extend your arms out to the sides.'),
(19, 3, 'Bring the handles together in front of you.'),

-- Chest Dip Steps
(20, 1, 'Grip the parallel bars and lift yourself up.'),
(20, 2, 'Lower your body by bending your elbows.'),
(20, 3, 'Press back up to the starting position.'),

-- Seated Row Steps
(21, 1, 'Sit at the seated row machine with your feet on the footrests.'),
(21, 2, 'Grip the handles and pull them towards your torso.'),
(21, 3, 'Extend your arms back to the starting position.'),

-- Face Pull Steps
(22, 1, 'Attach a rope handle to a high pulley.'),
(22, 2, 'Grip the rope with both hands and step back.'),
(22, 3, 'Pull the rope towards your face.'),

-- Lat Pulldown Steps
(23, 1, 'Sit at the lat pulldown machine with your knees under the pads.'),
(23, 2, 'Grip the bar with a wide grip.'),
(23, 3, 'Pull the bar down to your chest.'),

-- Reverse Fly Steps
(24, 1, 'Stand with feet hip-width apart, bend at the waist with dumbbells in hands.'),
(24, 2, 'Lift the dumbbells out to the sides.'),
(24, 3, 'Lower the dumbbells back down.'),

-- Preacher Curl Steps
(25, 1, 'Sit at the preacher curl bench with a barbell.'),
(25, 2, 'Curl the barbell towards your shoulders.'),
(25, 3, 'Lower the barbell back down.');

INSERT INTO exercises (name, image_url) VALUES
('Bicep Curl', 'http://example.com/bicep_curl.jpg'),
('Hammer Curl', 'http://example.com/hammer_curl.jpg'),
('Concentration Curl', 'http://example.com/concentration_curl.jpg'),
('Reverse Curl', 'http://example.com/reverse_curl.jpg'),
('Tricep Kickback', 'http://example.com/tricep_kickback.jpg'),
('Skull Crusher', 'http://example.com/skull_crusher.jpg'),
('Close Grip Bench Press', 'http://example.com/close_grip_bench_press.jpg'),
('Overhead Tricep Extension', 'http://example.com/overhead_tricep_extension.jpg'),
('Tricep Dip', 'http://example.com/tricep_dip.jpg'),
('Wrist Curl', 'http://example.com/wrist_curl.jpg'),
('Reverse Wrist Curl', 'http://example.com/reverse_wrist_curl.jpg'),
('Shoulder Press', 'http://example.com/shoulder_press.jpg'),
('Arnold Press', 'http://example.com/arnold_press.jpg'),
('Front Raise', 'http://example.com/front_raise.jpg'),
('Bent Over Lateral Raise', 'http://example.com/bent_over_lateral_raise.jpg'),
('Upright Row', 'http://example.com/upright_row.jpg'),
('Shrug', 'http://example.com/shrug.jpg'),
('Rear Delt Fly', 'http://example.com/rear_delt_fly.jpg'),
('Leg Extension', 'http://example.com/leg_extension.jpg'),
('Hack Squat', 'http://example.com/hack_squat.jpg'),
('Bulgarian Split Squat', 'http://example.com/bulgarian_split_squat.jpg'),
('Step-Up', 'http://example.com/step_up.jpg'),
('Lunge', 'http://example.com/lunge.jpg'),
('Glute Bridge', 'http://example.com/glute_bridge.jpg'),
('Hip Thrust', 'http://example.com/hip_thrust.jpg'),
('Donkey Kick', 'http://example.com/donkey_kick.jpg'),
('Fire Hydrant', 'http://example.com/fire_hydrant.jpg'),
('Standing Calf Raise', 'http://example.com/standing_calf_raise.jpg'),
('Seated Calf Raise', 'http://example.com/seated_calf_raise.jpg'),
('Toe Raise', 'http://example.com/toe_raise.jpg'),
('Hanging Leg Raise', 'http://example.com/hanging_leg_raise.jpg'),
('Bicycle Crunch', 'http://example.com/bicycle_crunch.jpg'),
('V-Up', 'http://example.com/v_up.jpg'),
('Mountain Climber', 'http://example.com/mountain_climber.jpg'),
('Leg Lift', 'http://example.com/leg_lift.jpg'),
('Side Plank', 'http://example.com/side_plank.jpg'),
('Windshield Wiper', 'http://example.com/windshield_wiper.jpg'),
('Dragon Flag', 'http://example.com/dragon_flag.jpg'),
('Bird Dog', 'http://example.com/bird_dog.jpg'),
('Superman', 'http://example.com/superman.jpg'),
('Hollow Hold', 'http://example.com/hollow_hold.jpg'),
('Russian Twist with Medicine Ball', 'http://example.com/russian_twist_medicine_ball.jpg'),
('Hanging Knee Raise', 'http://example.com/hanging_knee_raise.jpg'),
('Flutter Kick', 'http://example.com/flutter_kick.jpg'),
('Scissor Kick', 'http://example.com/scissor_kick.jpg'),
('Side Crunch', 'http://example.com/side_crunch.jpg'),
('Toe Touch', 'http://example.com/toe_touch.jpg'),
('Cable Crunch', 'http://example.com/cable_crunch.jpg'),
('Decline Crunch', 'http://example.com/decline_crunch.jpg'),
('Bench V-Up', 'http://example.com/bench_v_up.jpg'),
('Cable Woodchopper', 'http://example.com/cable_woodchopper.jpg'),
('Landmine Press', 'http://example.com/landmine_press.jpg'),
('Push-Up', 'http://example.com/push_up.jpg'),
('Incline Push-Up', 'http://example.com/incline_push_up.jpg'),
('Decline Push-Up', 'http://example.com/decline_push_up.jpg'),
('Diamond Push-Up', 'http://example.com/diamond_push_up.jpg'),
('Clap Push-Up', 'http://example.com/clap_push_up.jpg'),
('Pike Push-Up', 'http://example.com/pike_push_up.jpg'),
('Dumbbell Pullover', 'http://example.com/dumbbell_pullover.jpg'),
('Chest Press Machine', 'http://example.com/chest_press_machine.jpg'),
('Pec Deck Machine', 'http://example.com/pec_deck_machine.jpg'),
('Assisted Pull-Up', 'http://example.com/assisted_pull_up.jpg'),
('Neutral Grip Pull-Up', 'http://example.com/neutral_grip_pull_up.jpg'),
('One Arm Dumbbell Row', 'http://example.com/one_arm_dumbbell_row.jpg'),
('T-Bar Row', 'http://example.com/t_bar_row.jpg'),
('Pendlay Row', 'http://example.com/pendlay_row.jpg'),
('Cable Row', 'http://example.com/cable_row.jpg'),
('Inverted Row', 'http://example.com/inverted_row.jpg'),
('Dumbbell Deadlift', 'http://example.com/dumbbell_deadlift.jpg'),
('Sumo Deadlift', 'http://example.com/sumo_deadlift.jpg'),
('Romanian Deadlift', 'http://example.com/romanian_deadlift.jpg'),
('Stiff-Leg Deadlift', 'http://example.com/stiff_leg_deadlift.jpg'),
('Deficit Deadlift', 'http://example.com/deficit_deadlift.jpg');

INSERT INTO steps (exercise_id, step_number, description) VALUES
-- Bicep Curl Steps
(26, 1, 'Stand with feet shoulder-width apart, holding a dumbbell in each hand.'),
(26, 2, 'Curl the weights while contracting your biceps.'),
(26, 3, 'Lower the weights back to the starting position.'),

-- Hammer Curl Steps
(27, 1, 'Stand with feet shoulder-width apart, holding a dumbbell in each hand.'),
(27, 2, 'Curl the weights while keeping your palms facing each other.'),
(27, 3, 'Lower the weights back to the starting position.'),

-- Concentration Curl Steps
(28, 1, 'Sit on a bench, holding a dumbbell in one hand.'),
(28, 2, 'Curl the weight up to your shoulder.'),
(28, 3, 'Lower the weight back to the starting position.'),

-- Reverse Curl Steps
(29, 1, 'Stand with feet shoulder-width apart, holding a barbell with an overhand grip.'),
(29, 2, 'Curl the barbell while keeping your palms facing down.'),
(29, 3, 'Lower the barbell back to the starting position.'),

-- Tricep Kickback Steps
(30, 1, 'Stand with feet shoulder-width apart, holding a dumbbell in each hand.'),
(30, 2, 'Bend forward at the waist and extend your arms behind you.'),
(30, 3, 'Return to the starting position.'),

-- Skull Crusher Steps
(31, 1, 'Lie on a bench, holding a barbell with a narrow grip.'),
(31, 2, 'Lower the barbell to your forehead.'),
(31, 3, 'Extend your arms back to the starting position.'),

-- Close Grip Bench Press Steps
(32, 1, 'Lie on a bench, holding a barbell with a narrow grip.'),
(32, 2, 'Lower the barbell to your chest.'),
(32, 3, 'Press the barbell back to the starting position.'),

-- Overhead Tricep Extension Steps
(33, 1, 'Stand with feet shoulder-width apart, holding a dumbbell overhead.'),
(33, 2, 'Lower the dumbbell behind your head by bending your elbows.'),
(33, 3, 'Extend your arms to return to the starting position.'),

-- Tricep Dip Steps
(34, 1, 'Place your hands on parallel bars and lift your body.'),
(34, 2, 'Lower your body by bending your elbows.'),
(34, 3, 'Press back up to the starting position.'),

-- Wrist Curl Steps
(35, 1, 'Sit on a bench, holding a barbell with an underhand grip.'),
(35, 2, 'Curl the barbell up towards your forearms.'),
(35, 3, 'Lower the barbell back to the starting position.'),

-- Reverse Wrist Curl Steps
(36, 1, 'Sit on a bench, holding a barbell with an overhand grip.'),
(36, 2, 'Curl the barbell up towards your forearms.'),
(36, 3, 'Lower the barbell back to the starting position.'),

-- Shoulder Press Steps
(37, 1, 'Stand with feet shoulder-width apart, holding a barbell at shoulder height.'),
(37, 2, 'Press the barbell overhead until your arms are straight.'),
(37, 3, 'Lower the barbell back to shoulder height.'),

-- Arnold Press Steps
(38, 1, 'Sit on a bench, holding dumbbells at shoulder height, palms facing you.'),
(38, 2, 'Press the dumbbells overhead while rotating your palms outward.'),
(38, 3, 'Lower the dumbbells back to the starting position.'),

-- Front Raise Steps
(39, 1, 'Stand with feet shoulder-width apart, holding a dumbbell in each hand.'),
(39, 2, 'Lift the dumbbells in front of you to shoulder height.'),
(39, 3, 'Lower the dumbbells back to the starting position.'),

-- Bent Over Lateral Raise Steps
(40, 1, 'Stand with feet shoulder-width apart, bend at the waist with dumbbells in hands.'),
(40, 2, 'Lift the dumbbells out to the sides.'),
(40, 3, 'Lower the dumbbells back down.'),

-- Upright Row Steps
(41, 1, 'Stand with feet shoulder-width apart, holding a barbell with an overhand grip.'),
(41, 2, 'Lift the barbell to your chin, keeping it close to your body.'),
(41, 3, 'Lower the barbell back to the starting position.'),

-- Shrug Steps
(42, 1, 'Stand with feet shoulder-width apart, holding a dumbbell in each hand.'),
(42, 2, 'Raise your shoulders towards your ears.'),
(42, 3, 'Lower your shoulders back down.'),

-- Rear Delt Fly Steps
(43, 1, 'Sit on a bench, holding a dumbbell in each hand.'),
(43, 2, 'Bend forward at the waist and lift the dumbbells out to the sides.'),
(43, 3, 'Lower the dumbbells back down.'),

-- Leg Extension Steps
(44, 1, 'Sit on the leg extension machine with your feet under the pad.'),
(44, 2, 'Extend your legs until they are straight.'),
(44, 3, 'Lower your legs back to the starting position.'),

-- Hack Squat Steps
(45, 1, 'Stand on the hack squat machine with your feet shoulder-width apart.'),
(45, 2, 'Lower your body by bending your knees and hips.'),
(45, 3, 'Press back up to the starting position.'),

-- Bulgarian Split Squat Steps
(46, 1, 'Stand with one foot on a bench behind you and the other foot forward.'),
(46, 2, 'Lower your body by bending your front knee.'),
(46, 3, 'Press back up to the starting position.'),

-- Step-Up Steps
(47, 1, 'Stand in front of a bench, holding a dumbbell in each hand.'),
(47, 2, 'Step up onto the bench with one foot.'),
(47, 3, 'Step back down and repeat with the other foot.'),

-- Lunge Steps
(48, 1, 'Stand with feet shoulder-width apart, holding a dumbbell in each hand.'),
(48, 2, 'Step forward with one foot and lower your body.'),
(48, 3, 'Press back up to the starting position.'),

-- Glute Bridge Steps
(49, 1, 'Lie on your back with your knees bent and feet flat on the floor.'),
(49, 2, 'Lift your hips until your body forms a straight line from shoulders to knees.'),
(49, 3, 'Lower your hips back down.'),

-- Hip Thrust Steps
(50, 1, 'Sit on the floor with your upper back against a bench and a barbell over your hips.'),
(50, 2, 'Lift your hips until your body forms a straight line from shoulders to knees.'),
(50, 3, 'Lower your hips back down.'),

-- Donkey Kick Steps
(51, 1, 'Get on all fours with your hands under your shoulders and knees under your hips.'),
(51, 2, 'Kick one leg up towards the ceiling.'),
(51, 3, 'Lower your leg back down and repeat with the other leg.'),

-- Fire Hydrant Steps
(52, 1, 'Get on all fours with your hands under your shoulders and knees under your hips.'),
(52, 2, 'Lift one leg out to the side.'),
(52, 3, 'Lower your leg back down and repeat with the other leg.'),

-- Standing Calf Raise Steps
(53, 1, 'Stand with your feet shoulder-width apart.'),
(53, 2, 'Raise your heels as high as possible.'),
(53, 3, 'Lower your heels back down.'),

-- Seated Calf Raise Steps
(54, 1, 'Sit on the calf raise machine with your feet under the pad.'),
(54, 2, 'Raise your heels as high as possible.'),
(54, 3, 'Lower your heels back down.'),

-- Toe Raise Steps
(55, 1, 'Stand with your feet shoulder-width apart.'),
(55, 2, 'Lift your toes as high as possible.'),
(55, 3, 'Lower your toes back down.'),

-- Hanging Leg Raise Steps
(56, 1, 'Hang from a pull-up bar with your hands shoulder-width apart.'),
(56, 2, 'Lift your legs until they are parallel to the floor.'),
(56, 3, 'Lower your legs back down.'),

-- Bicycle Crunch Steps
(57, 1, 'Lie on your back with your hands behind your head.'),
(57, 2, 'Lift your shoulders off the floor and bring one knee towards your chest.'),
(57, 3, 'Twist your torso to bring the opposite elbow towards the knee.'),
(57, 4, 'Repeat on the other side.'),

-- V-Up Steps
(58, 1, 'Lie on your back with your legs straight and arms extended overhead.'),
(58, 2, 'Lift your legs and torso to form a V shape.'),
(58, 3, 'Lower your legs and torso back down.'),

-- Mountain Climber Steps
(59, 1, 'Start in a push-up position with your hands under your shoulders.'),
(59, 2, 'Bring one knee towards your chest.'),
(59, 3, 'Switch legs, bringing the other knee towards your chest.'),

-- Leg Lift Steps
(60, 1, 'Lie on your back with your legs straight and hands under your buttocks.'),
(60, 2, 'Lift your legs until they are perpendicular to the floor.'),
(60, 3, 'Lower your legs back down.'),

-- Side Plank Steps
(61, 1, 'Lie on your side with your legs straight and elbow under your shoulder.'),
(61, 2, 'Lift your hips until your body forms a straight line from head to feet.'),
(61, 3, 'Hold the position.'),

-- Windshield Wiper Steps
(62, 1, 'Lie on your back with your legs straight and arms out to the sides.'),
(62, 2, 'Lift your legs until they are perpendicular to the floor.'),
(62, 3, 'Lower your legs to one side, then the other.'),

-- Dragon Flag Steps
(63, 1, 'Lie on a bench, holding the bench behind your head for support.'),
(63, 2, 'Lift your legs and torso to form a straight line from shoulders to feet.'),
(63, 3, 'Lower your legs and torso back down.'),

-- Bird Dog Steps
(64, 1, 'Get on all fours with your hands under your shoulders and knees under your hips.'),
(64, 2, 'Extend one arm and the opposite leg.'),
(64, 3, 'Return to the starting position and repeat with the other arm and leg.'),

-- Superman Steps
(65, 1, 'Lie face down on the floor with your arms extended overhead.'),
(65, 2, 'Lift your arms and legs off the floor.'),
(65, 3, 'Lower your arms and legs back down.'),

-- Hollow Hold Steps
(66, 1, 'Lie on your back with your arms extended overhead.'),
(66, 2, 'Lift your arms, legs, and torso off the floor.'),
(66, 3, 'Hold the position.'),

-- Russian Twist with Medicine Ball Steps
(67, 1, 'Sit on the floor with your knees bent and feet flat.'),
(67, 2, 'Lean back slightly and hold a medicine ball with both hands.'),
(67, 3, 'Twist your torso to the right, then to the left.'),

-- Hanging Knee Raise Steps
(68, 1, 'Hang from a pull-up bar with your hands shoulder-width apart.'),
(68, 2, 'Lift your knees towards your chest.'),
(68, 3, 'Lower your knees back down.'),

-- Flutter Kick Steps
(69, 1, 'Lie on your back with your legs straight and hands under your buttocks.'),
(69, 2, 'Lift your legs slightly off the floor.'),
(69, 3, 'Alternately kick your legs up and down.'),

-- Scissor Kick Steps
(70, 1, 'Lie on your back with your legs straight and hands under your buttocks.'),
(70, 2, 'Lift your legs slightly off the floor.'),
(70, 3, 'Alternately cross your legs over each other.'),

-- Side Crunch Steps
(71, 1, 'Lie on your side with your legs bent and hands behind your head.'),
(71, 2, 'Lift your shoulders off the floor.'),
(71, 3, 'Lower your shoulders back down.'),

-- Toe Touch Steps
(72, 1, 'Lie on your back with your legs straight and arms extended overhead.'),
(72, 2, 'Lift your legs and reach for your toes.'),
(72, 3, 'Lower your legs and arms back down.'),

-- Cable Crunch Steps
(73, 1, 'Kneel in front of a cable machine with a rope attachment.'),
(73, 2, 'Hold the rope behind your head.'),
(73, 3, 'Curl your torso towards your thighs.'),

-- Decline Crunch Steps
(74, 1, 'Lie on a decline bench with your feet secured.'),
(74, 2, 'Lift your shoulders towards your knees.'),
(74, 3, 'Lower your shoulders back down.'),

-- Bench V-Up Steps
(75, 1, 'Sit on a bench with your legs straight and hands holding the bench.'),
(75, 2, 'Lift your legs and torso to form a V shape.'),
(75, 3, 'Lower your legs and torso back down.'),

-- Cable Woodchopper Steps
(76, 1, 'Stand with your feet shoulder-width apart next to a cable machine.'),
(76, 2, 'Hold the handle with both hands.'),
(76, 3, 'Pull the handle diagonally across your body.'),

-- Landmine Press Steps
(77, 1, 'Stand with your feet shoulder-width apart, holding a barbell in a landmine attachment.'),
(77, 2, 'Press the barbell overhead.'),
(77, 3, 'Lower the barbell back down.'),

-- Push-Up Steps
(78, 1, 'Get into a push-up position with your hands under your shoulders.'),
(78, 2, 'Lower your body until your chest touches the floor.'),
(78, 3, 'Press back up to the starting position.'),

-- Incline Push-Up Steps
(79, 1, 'Place your hands on an elevated surface and get into a push-up position.'),
(79, 2, 'Lower your body until your chest touches the surface.'),
(79, 3, 'Press back up to the starting position.'),

-- Decline Push-Up Steps
(80, 1, 'Place your feet on an elevated surface and get into a push-up position.'),
(80, 2, 'Lower your body until your chest touches the floor.'),
(80, 3, 'Press back up to the starting position.'),

-- Diamond Push-Up Steps
(81, 1, 'Get into a push-up position with your hands close together.'),
(81, 2, 'Lower your body until your chest touches the floor.'),
(81, 3, 'Press back up to the starting position.'),

-- Clap Push-Up Steps
(82, 1, 'Get into a push-up position with your hands under your shoulders.'),
(82, 2, 'Lower your body until your chest touches the floor.'),
(82, 3, 'Press up explosively and clap your hands.'),

-- Pike Push-Up Steps
(83, 1, 'Get into a push-up position with your hips raised.'),
(83, 2, 'Lower your head towards the floor.'),
(83, 3, 'Press back up to the starting position.'),

-- Dumbbell Pullover Steps
(84, 1, 'Lie on a bench with your upper back supported and feet flat on the floor.'),
(84, 2, 'Hold a dumbbell with both hands and extend your arms overhead.'),
(84, 3, 'Lower the dumbbell behind your head.'),
(84, 4, 'Raise the dumbbell back to the starting position.'),

-- Chest Press Machine Steps
(85, 1, 'Sit on the chest press machine with your feet flat on the floor.'),
(85, 2, 'Grip the handles and press them forward until your arms are fully extended.'),
(85, 3, 'Return to the starting position.'),

-- Pec Deck Machine Steps
(86, 1, 'Sit on the pec deck machine with your feet flat on the floor.'),
(86, 2, 'Grip the handles and bring them together in front of your chest.'),
(86, 3, 'Return to the starting position.'),

-- Assisted Pull-Up Steps
(87, 1, 'Stand on the platform of an assisted pull-up machine.'),
(87, 2, 'Grip the handles and pull yourself up until your chin is above the bar.'),
(87, 3, 'Lower yourself back to the starting position.'),

-- Neutral Grip Pull-Up Steps
(88, 1, 'Grip the pull-up bar with your palms facing each other.'),
(88, 2, 'Pull yourself up until your chin is above the bar.'),
(88, 3, 'Lower yourself back to the starting position.'),

-- One Arm Dumbbell Row Steps
(89, 1, 'Place one knee and one hand on a bench for support.'),
(89, 2, 'Hold a dumbbell in the other hand.'),
(89, 3, 'Pull the dumbbell towards your hip.'),
(89, 4, 'Lower the dumbbell back to the starting position.'),

-- T-Bar Row Steps
(90, 1, 'Stand with your feet shoulder-width apart, holding the T-bar.'),
(90, 2, 'Bend at the waist and pull the bar towards your chest.'),
(90, 3, 'Lower the bar back to the starting position.'),

-- Pendlay Row Steps
(91, 1, 'Stand with your feet shoulder-width apart, holding a barbell.'),
(91, 2, 'Bend at the waist and pull the barbell towards your chest.'),
(91, 3, 'Lower the barbell back to the starting position.'),

-- Cable Row Steps
(92, 1, 'Sit on the cable row machine with your feet flat on the platform.'),
(92, 2, 'Grip the handle and pull it towards your waist.'),
(92, 3, 'Return to the starting position.'),

-- Inverted Row Steps
(93, 1, 'Set up a barbell in a power rack at waist height.'),
(93, 2, 'Lie on your back under the bar and grip it with both hands.'),
(93, 3, 'Pull your chest towards the bar.'),
(93, 4, 'Lower yourself back down.'),

-- Dumbbell Deadlift Steps
(94, 1, 'Stand with your feet shoulder-width apart, holding a dumbbell in each hand.'),
(94, 2, 'Bend at the waist and lower the dumbbells towards the floor.'),
(94, 3, 'Lift the dumbbells back to the starting position.'),

-- Sumo Deadlift Steps
(95, 1, 'Stand with your feet wide apart, holding a barbell.'),
(95, 2, 'Lower the barbell towards the floor.'),
(95, 3, 'Lift the barbell back to the starting position.'),

-- Romanian Deadlift Steps
(96, 1, 'Stand with your feet shoulder-width apart, holding a barbell.'),
(96, 2, 'Bend at the waist and lower the barbell towards the floor.'),
(96, 3, 'Lift the barbell back to the starting position.'),

-- Stiff-Leg Deadlift Steps
(97, 1, 'Stand with your feet shoulder-width apart, holding a barbell.'),
(97, 2, 'Keep your legs straight as you lower the barbell towards the floor.'),
(97, 3, 'Lift the barbell back to the starting position.'),

-- Deficit Deadlift Steps
(98, 1, 'Stand on a platform with your feet shoulder-width apart, holding a barbell.'),
(98, 2, 'Lower the barbell towards the floor.'),
(98, 3, 'Lift the barbell back to the starting position.');


INSERT INTO exercise_muscles (exercise_id, muscle_id) VALUES
-- Bench Press
(1, 1),
(1, 3),

-- Incline Bench Press
(2, 1),
(2, 3),

-- Decline Bench Press
(3, 1),
(3, 3),

-- Dumbbell Fly
(4, 1),

-- Push-Up
(5, 1),
(5, 3),

-- Pull-Up
(6, 2),
(6, 10),

-- Chin-Up
(7, 2),
(7, 10),

-- Lat Pulldown
(8, 2),
(8, 10),

-- Bent Over Row
(9, 2),
(9, 10),

-- One Arm Row
(10, 2),
(10, 10),

-- Deadlift
(11, 2),
(11, 6),
(11, 8),
(11, 10),

-- Squat
(12, 6),

-- Front Squat
(13, 6),

-- Lunge
(14, 6),

-- Leg Press
(15, 6),

-- Leg Curl
(16, 7),

-- Calf Raise
(17, 7),

-- Seated Calf Raise
(18, 7),

-- Standing Calf Raise
(19, 7),

-- Bicep Curl
(20, 2),

-- Hammer Curl
(21, 2),

-- Tricep Extension
(22, 3),

-- Skull Crusher
(23, 3),

-- Overhead Tricep Extension
(24, 3),

-- Tricep Dip
(25, 3);


INSERT INTO exercise_muscles (exercise_id, muscle_id) VALUES
-- Bicep Curl
(26, 2),

-- Hammer Curl
(27, 2),

-- Concentration Curl
(28, 2),

-- Reverse Curl
(29, 2),

-- Tricep Kickback
(30, 3),

-- Skull Crusher
(31, 3),

-- Close Grip Bench Press
(32, 3),

-- Overhead Tricep Extension
(33, 3),

-- Tricep Dip
(34, 3),

-- Wrist Curl
(35, 9),

-- Reverse Wrist Curl
(36, 9),

-- Shoulder Press
(37, 5),

-- Arnold Press
(38, 5),

-- Front Raise
(39, 5),

-- Bent Over Lateral Raise
(40, 5),

-- Upright Row
(41, 5),

-- Shrug
(42, 5),

-- Rear Delt Fly
(43, 5),

-- Leg Extension
(44, 6),

-- Hack Squat
(45, 6),

-- Bulgarian Split Squat
(46, 6),

-- Step-Up
(47, 6),

-- Lunge
(48, 6),

-- Glute Bridge
(49, 8),

-- Hip Thrust
(50, 8);

INSERT INTO exercise_muscles (exercise_id, muscle_id) VALUES
-- Donkey Kick
(51, 8),

-- Fire Hydrant
(52, 8),

-- Standing Calf Raise
(53, 7),

-- Seated Calf Raise
(54, 7),

-- Toe Raise
(55, 7),

-- Hanging Leg Raise
(56, 4),

-- Bicycle Crunch
(57, 4),

-- V-Up
(58, 4),

-- Mountain Climber
(59, 4),

-- Leg Lift
(60, 4),

-- Side Plank
(61, 4),

-- Windshield Wiper
(62, 4),

-- Dragon Flag
(63, 4),

-- Bird Dog
(64, 4),

-- Superman
(65, 4),

-- Hollow Hold
(66, 4),

-- Russian Twist with Medicine Ball
(67, 4),

-- Hanging Knee Raise
(68, 4),

-- Flutter Kick
(69, 4),

-- Scissor Kick
(70, 4),

-- Side Crunch
(71, 4),

-- Toe Touch
(72, 4),

-- Cable Crunch
(73, 4),

-- Decline Crunch
(74, 4),

-- Bench V-Up
(75, 4);

INSERT INTO exercise_muscles (exercise_id, muscle_id) VALUES
-- Cable Woodchopper
(76, 4),

-- Landmine Press
(77, 5),

-- Push-Up
(78, 1),

-- Incline Push-Up
(79, 1),

-- Decline Push-Up
(80, 1),

-- Diamond Push-Up
(81, 1),

-- Clap Push-Up
(82, 1),

-- Pike Push-Up
(83, 1),

-- Dumbbell Pullover
(84, 1),

-- Chest Press Machine
(85, 1),

-- Pec Deck Machine
(86, 1),

-- Assisted Pull-Up
(87, 10),

-- Neutral Grip Pull-Up
(88, 10),

-- One Arm Dumbbell Row
(89, 10),

-- T-Bar Row
(90, 10),

-- Pendlay Row
(91, 10),

-- Cable Row
(92, 10),

-- Inverted Row
(93, 10),

-- Dumbbell Deadlift
(94, 10),

-- Sumo Deadlift
(95, 10),

-- Romanian Deadlift
(96, 10),

-- Stiff-Leg Deadlift
(97, 10),

-- Deficit Deadlift
(98, 10);
