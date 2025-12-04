In this Struture of Project is Written and for each file every detail is written is each file


# Backend 
    1. CodeReader
        delete_file.js (delete the file after used ex solution.out)
        make_file.js  (make a file from user code to execution we don't run program on user file)
    
    2. CodeRunner
        cpp_runner.js (used to run the cpp file it directly check submission folder and create output.txt)
        python_runner.js (used to run the python file)
        run.js (Main file where all process start for code execuion)
        testcase.js (fetch the testcase from and append it to submisson folder)
        output_matching.js (after getting output we match with actual output)

    3. Submission
        user_code.ext (user_code file when he run or submit it )
        input.txt (created by testcase.js file unique for each problem_id)
        actual_output.txt (created by testcase file)
        output.txt (file where user output come)
        solution.ext (make this for perfoming the operation)
        solution.out (executable file only for cpp)

    
# DataBase
    1. Problem Table 
        +--------------+--------------+------+-----+----------------------+-------------------+
        | Field        | Type         | Null | Key | Default              | Extra             |
        +--------------+--------------+------+-----+----------------------+-------------------+
        | id           | int          | NO   | PRI | NULL                 | auto_increment    |
        | title        | varchar(191) | NO   | UNI | NULL                 |                   |
        | rating       | int          | NO   |     | NULL                 |                   |
        | tags         | json         | NO   |     | NULL                 |                   |
        | description  | longtext     | NO   |     | NULL                 |                   |
        | constraints  | longtext     | NO   |     | NULL                 |                   |
        | sampleInput  | longtext     | NO   |     | NULL                 |                   |
        | sampleOutput | longtext     | NO   |     | NULL                 |                   |
        | notes        | longtext     | NO   |     | NULL                 |                   |
        | createdAt    | datetime(3)  | NO   |     | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED |
        | updatedAt    | datetime(3)  | NO   |     | NULL                 |                   |
        +--------------+--------------+------+-----+----------------------+-------------------+

    2. TestCase
        +-----------+----------+------+-----+---------+----------------+
        | Field     | Type     | Null | Key | Default | Extra          |
        +-----------+----------+------+-----+---------+----------------+
        | id        | int      | NO   | PRI | NULL    | auto_increment |
        | problemId | int      | NO   | MUL | NULL    |                |
        | input     | longtext | NO   |     | NULL    |                |
        | output    | longtext | NO   |     | NULL    |                |
        +-----------+----------+------+-----+---------+----------------+

    3. User
        +-----------+--------------+------+-----+----------------------+-------------------+
        | Field     | Type         | Null | Key | Default              | Extra             |
        +-----------+--------------+------+-----+----------------------+-------------------+
        | id        | int          | NO   | PRI | NULL                 | auto_increment    |
        | username  | varchar(191) | NO   | UNI | NULL                 |                   |
        | email     | varchar(191) | NO   | UNI | NULL                 |                   |
        | password  | varchar(191) | NO   |     | NULL                 |                   |
        | createdAt | datetime(3)  | NO   |     | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED |
        +-----------+--------------+------+-----+----------------------+-------------------+
    
    4. Submission
        +-------------+--------------+------+-----+----------------------+-------------------+
        | Field       | Type         | Null | Key | Default              | Extra             |
        +-------------+--------------+------+-----+----------------------+-------------------+
        | id          | int          | NO   | PRI | NULL                 | auto_increment    |
        | userId      | int          | NO   | MUL | NULL                 |                   |
        | problemId   | int          | NO   | MUL | NULL                 |                   |
        | code        | longtext     | NO   |     | NULL                 |                   |
        | language    | varchar(191) | NO   |     | NULL                 |                   |
        | verdict     | varchar(191) | NO   |     | NULL                 |                   |
        | submittedAt | datetime(3)  | NO   |     | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED |
        +-------------+--------------+------+-----+----------------------+-------------------+


