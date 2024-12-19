<h1>Cloning the Repository</h1>
------------------------

To host the backend server live on your Ubuntu terminal, you need to clone the repository from GitHub. Follow the steps below:

1.  **Open your terminal.**

2.  **Navigate to the directory** where you want to clone the repository:

    > `cd /path/to/your/directory`

3.  **Clone the repository** using the following command:

    > `git clone https://github.com/ershubhanker/gym_management.git`

4.  **Navigate into the cloned directory:**

    >`cd gym_management`

<h1>Pulling Updates from GitHub</h1>
---------------------------

To keep your local repository up-to-date with the latest changes from the remote repository, follow these steps:

1.  **Open your terminal.**

2.  **Navigate to the cloned directory** if you're not already there:

     >`cd /path/to/your/directory/gym_management`

3.  **Pull the latest changes** from the GitHub repository:

    >`git pull origin main`

<h1>Authentication</h1>
--------------

If prompted for a username and password, use the following credentials:

-   **Username:** ershubhanker
-   **Password:** ********

<h1>Guide to MongoDB Implementation in Members Monitor</h1>

**1. Introduction**

This report provides an in-depth overview of the MongoDB database
implementation for our membersmonitor.com platform. It covers the
installation and configuration of MongoDB on an Ubuntu server, the
database connection setup, and details about the five collections used:
Admin, OTP, TraineeForm, UserInfo, and VerifyEmail. This report aims to
help a new user understand the database structure and the connections
between the collections used in the website.

**2. Installation and Setup**

**Installing MongoDB on Ubuntu Server:**

1.  **Import the MongoDB Public Key:**

> wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc \| sudo
> apt-key add -

2.  **Create a List File for MongoDB:**

> echo \"deb \[ arch=amd64,arm64 \] https://repo.mongodb.org/apt/ubuntu
> focal/mongodb-org/4.4 multiverse\" \| sudo tee
> /etc/apt/sources.list.d/mongodb-org-4.4.list

3.  **Reload Local Package Database:**

> sudo apt-get update

4.  **Install MongoDB Packages:**

> sudo apt-get install -y mongodb-org

5.  **Start MongoDB:**

> sudo systemctl start mongod

6.  **Enable MongoDB to Start on Boot:**

> sudo systemctl enable mongod

**Solution to Installation Issues:** If you encounter issues during the
installation, try the following steps:

-   **Update Package Index:**

> sudo apt-get update
>
> sudo apt-get upgrade

-   **Ensure All Required Packages are Installed:**

> sudo apt-get install -y libcurl4 openssl

-   **Check the MongoDB Service Status:**

> sudo systemctl status mongod

-   **Review MongoDB Logs for Errors:**

> cat /var/log/mongodb/mongod.log

-   **Restart the MongoDB Service:**

> sudo systemctl restart mongod

-   **Reinstall MongoDB if Necessary:**

> sudo apt-get remove mongodb-org
>
> sudo apt-get purge mongodb-org
>
> sudo apt-get autoremove
>
> sudo apt-get install -y mongodb-org

**3. Database Connection**

**Environment Configuration (.env):**

-   Contains sensitive data and configurations such as the database
    connection string, email credentials, and API keys.

**Database Connection File (dbConnection.js):**

-   Uses mongoose.connect with the connection string from the .env file
    to establish a connection to the MongoDB database.

> const mongoose = require(\"mongoose\");
>
> require(\"dotenv\").config();
>
> const dbConnect = () =\> {
>
> mongoose.connect(process.env.URL, {
>
> useNewUrlParser: true,
>
> useUnifiedTopology: true
>
> })
>
> .then(() =\> {
>
> console.log(\"DB connection is successful\");
>
> })
>
> .catch((err) =\> {
>
> console.error(\"Some error occurred while making the DB connection:\",
> err.message);
>
> console.log(\"Please check if your IP is whitelisted in MongoDB
> Atlas.\");
>
> process.exit(1);
>
> });
>
> };
>
> module.exports = dbConnect;
>
> **Explanation**: The database connection uses environment variables
> from the .env file to manage sensitive data securely. The connection
> string for MongoDB is specified in process.env.URL.

**4. Database Structure and Schema**

This section details the structure of each collection used in the
website, including the schema definition and purpose.

**Admin Collection:**

-   **Purpose**: Stores information about the website administrators.

-   **Key Fields**: name, email, photo, password, role.

**OTP Collection:**

-   **Purpose**: Stores OTPs generated during email verification.

-   **Key Fields**: userId (reference to User), otp.

**TraineeForm Collection:**

-   **Purpose**: Stores data about the trainees.

-   **Key Fields**: owner (reference to User), name, email, phone,
    dateOfBirth, gymPlan, amount, registrationDate.

**UserInfo Collection:**

-   **Purpose**: Contains information about all users logged in to the
    website.

-   **Key Fields**: name, phone, email, photo, password,
    registrationDate, plan, isAgreeTerms.

**VerifyEmail Collection:**

-   **Purpose**: Stores information about email verifications, including
    the OTPs generated for verification purposes.

-   **Key Fields**: email, otp.

**5. Relationships Between Collections**

**UserInfo and OTP Relationship:**

-   **UserInfo** collection is referenced in the **OTP** collection
    using the userId field.

-   **Purpose**: To track which OTP belongs to which user.

**UserInfo and TraineeForm Relationship:**

-   **UserInfo** collection is referenced in the **TraineeForm**
    collection using the owner field.

-   **Purpose**: To associate each trainee form with a specific user.

**Schema References:**

-   In the **OTP** schema:

> userId: {
>
> type: mongoose.Schema.Types.ObjectId,
>
> required: true,
>
> ref: \'user\'
>
> }

-   In the **TraineeForm** schema:

> owner: {
>
> type: mongoose.Schema.Types.ObjectId,
>
> ref: \'user\',
>
> required: true,
>
> default: \'658d00b9089c300d64f08441\'
>
> }

**6. Challenges and Solutions**

**Challenge 1**: Handling Expired OTPs

-   **Solution**: Used the expires property in the OTP schema to
    automatically remove expired OTPs.

**Challenge 2**: Data Consistency Between UserInfo and OTP Collections

-   **Solution**: Implemented proper referencing and population methods
    to ensure data consistency and integrity.

**Challenge 3**: Ensuring Secure Data Storage

-   **Solution**: Stored sensitive data such as passwords in a hashed
    format using bcrypt.

**Challenge 4**: MongoDB Atlas Connection Issues

-   **Error**: Could not connect to any servers in your MongoDB Atlas
    cluster. One common reason is that you\'re trying to access the
    database from an IP that isn\'t whitelisted.

-   **Solution**: Check if your current IP address is on your Atlas
    cluster\'s IP whitelist: [[MongoDB Atlas Security
    Whitelist]{.underline}](https://www.mongodb.com/docs/atlas/security-whitelist/)

-   **Code**: Modified the catch block in the database connection file
    to provide a helpful message and exit the process if the connection
    fails

![image1](https://github.com/ershubhanker/gym_management/assets/151928417/5b6ba43f-9510-48f1-b113-edf4fe0762bf)

**Challenge 5**: MongoDB Installation Failures

-   **Error**: Encountered issues during MongoDB installation on the
    Ubuntu server.

-   **Solution**:

    -   **Update Package Index**:

> sudo apt-get update
>
> sudo apt-get upgrade

-   **Ensure All Required Packages are Installed**:

> sudo apt-get install -y libcurl4 openssl

-   **Check the MongoDB Service Status**:

> sudo systemctl status mongod

-   **Review MongoDB Logs for Errors**:

> cat /var/log/mongodb/mongod.log

-   **Restart the MongoDB Service**:

> sudo systemctl restart mongod

-   **Reinstall MongoDB if Necessary**:

> sudo apt-get remove mongodb-org
>
> sudo apt-get purge mongodb-org
>
> sudo apt-get autoremove
>
> sudo apt-get install -y mongodb-org

This addition addresses the challenge of encountering issues during
MongoDB installation and provides steps to troubleshoot and resolve
them.

**7. Accessing and Browsing the Database with MongoDB Compass**

> To access or browse the data in the MongoDB database, you can use
> MongoDB Compass. Follow these steps to download and install MongoDB
> Compass:

1.  **Download MongoDB Compass:**

    -   Visit the [MongoDB Compass Download
        Page](https://www.mongodb.com/try/download/compass).

    -   Select the version compatible with your operating system and
        download the installer.

2.  **Install MongoDB Compass:**

    -   Follow the installation instructions for your operating system
        to install MongoDB Compass.

3.  **Connect to the Database:**

    -   Open MongoDB Compass.

    -   In the \"New Connection\" window, enter the connection string:

> mongodb://103.235.105.69:27017/

-   Click \"Connect.\"
![image2](https://github.com/ershubhanker/gym_management/assets/151928417/2e65183e-2337-40ae-b1da-c0e05e49a422)

>
- Once connected, you can browse the collections and documents within
- the database.
-
- **Note:** As specified earlier, the Admin collection data is hard coded and can only be added manually by inserting data into
> mongodb://103.235.105.69:27017/
> 
using MongoDB Compass. It cannot be added directly from the website.









<h1>Guide to Backend Server Management</h1>

**1. NPM Installation**

>Node Package Manager (NPM) is essential for managing the packages and dependencies required by a Node.js application. Follow these steps to install Node.js and NPM on an Ubuntu server:

**Installation Steps:**

1. **Update the package index:**

  > sudo apt update

1. **Install Node.js and NPM:**

  > sudo apt install nodejs npm -y

1. **Verify the installation:**

  > node -v

  > npm -v

**2. Running the Backend Without Termination**

Ensuring your backend server runs continuously without termination is crucial for maintaining uninterrupted service. Here are two methods to achieve this:

**Method 1: Using Forever**

forever is a Node.js package that ensures your Node.js script runs continuously.

1. **Install forever globally:**

  > sudo npm install -g forever

1. **Run the backend server:**

  > forever start path/to/your/backend/app.js

  Replace path/to/your/backend/app.js with the actual path to your server file.

1. **Check the status of the running scripts:**

  > forever list

1. **Stop a running script:**

  > forever stop [process\_id/index]

   You can find the process ID or index from the list command.

**Method 2: Using nohup**

>nohup (no hang up) allows a command to keep running after the user has logged out.

1. **Run the backend server with nohup:**

 >  nohup node path/to/your/backend/app.js > output.log 2>&1 &

  Replace path/to/your/backend/app.js with the actual path to your server file. The & at the end runs the process in the background, and output.log will capture the output.

1. **Check running processes to find your backend server:**

 >  ps aux | grep node

1. **Stop the backend server:** Find the process ID (PID) of your backend server using the above command and then kill the process:

  > kill -9 [PID]

   Replace [PID] with the actual process ID obtained from the ps aux | grep node command.

**3. Commands for Managing Backend Processes**

**List Open Files and Ports (lsof -i):**

This command is used to list all open files and network ports that are being used by the processes.

1. **List all network connections:**

  > lsof -i

1. **List network connections on a specific port:**

  > lsof -i :PORT\_NUMBER

   Replace PORT\_NUMBER with the specific port you want to check.

1. **List network connections for a specific process:**

  > lsof -i -n -P | grep node

**Killing Processes (kill):**

The kill command is used to terminate processes.

1. **List running processes:**

  > ps aux

1. **Find the process ID (PID) of your backend server:**

 >  ps aux | grep node

1. **Kill a process using its PID:**

  > kill -9 [PID]

   Replace [PID] with the actual process ID obtained from the previous command.

**Summary**

This guide outlines the necessary steps and commands to install Node.js and NPM, run the backend server continuously using forever or nohup, and manage backend processes on an Ubuntu server. These methods and commands help in monitoring and controlling backend services efficiently, ensuring a smooth and continuous operation of your MERN stack application.


