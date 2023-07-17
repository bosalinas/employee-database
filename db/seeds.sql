INSERT INTO department (id, deptname)
VALUES  (01, "Sales"),
        (02, "Creative Development"), 
        (03, "Marketing"),
        (04, "Human Resources"); 

INSERT INTO employee_role (id, title, salary, department_id)
VALUE   (104, "Talent Manager", 53000, 04),
        (204, "Senior Human Resources", 65000, 04),
        (304, "HR Specialist I", 45000, 04),
        (101, "Sales Manager", 50000, 01),
        (201, "Sales Specialist", 50000, 01),
        (103, "Account Executive", 45000, 03),
        (203, "Brand Manager", 45000, 03),
        (303, "Public Relations Specialist", 45000, 03),
        (102, "Media Buyer", 45000, 02),
        (202, "Art Director", 50000, 02),
        (302, "Graphic Designer", 45000, 02),
        (402, "Copywriter", 50000, 02); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (8000, 'Caspian', 'Bond', 104, null),
        (8001, 'Owais', 'Heath', 204, 8000),
        (8002, 'Julian', 'Lee', 304, 8000),
        (8003, 'Erika', 'Tanner', 304, 8000),
        (8004, 'Hayden', 'Becker', 101, null),
        (8005, 'Nicola', 'Church', 201, 8004),
        (8006, 'Kai', 'Harrington', 201, 8004),
        (8007, 'Malik', 'Shannon', 103, null),
        (8008, 'Zane', 'Rocha', 203, null),
        (8009, 'Jaime', 'OConnel', 303, 8007),
        (8010, 'Jose', 'Pruitt', 202, null),
        (8011, 'Cian', 'Mullen', 102, null),
        (8012, 'Mina', 'Buckley', 302, 8010),
        (8013, 'Darcy', 'Howell', 302, 8010),
        (8014, 'Jordan', 'Ramos', 402, 8010);
