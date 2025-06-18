# Setup for Pets App (Starting from Week 1 Lab 1 to deployment)
- Prerequisites: VS Code, node, npm.
  - `node --version` > v22.16.0
  - `npm --version` > 10.9.2

Course Portal: Starting Point for week 3.
- Link: https://courses.codepath.org/courses/site/unit/3#!overview

Lab 1:
- Download > Insomnia
  - Link: https://insomnia.rest/
  - Download and install in Applications

Lab 2: 
- 

Lab 3: 
- Install: PostgreSQL: https://www.postgresql.org/ > Download > MacOS 
  - > Download the Installer > 17.5 > 
  - Download > Mac OS X (Click download icon)
  - Install in Applications
- Install: pgAdmin: https://www.pgadmin.org/ > Download > MacOS
  - Downlaod > `pgAdmin 4 v9.4 (released May 29, 2025)`
  - Downlaod > `pgadmin4-9.4-arm64.dmg`
  - Install in Applications
    - Default Directory: /Library/PostgreSQL/17
    - Select All Applications
    - Default Directory: /Library/PostgreSQL/17/data
    - ! Password ! This will be public!!! `okokok`
    - Port: 5432
    - Locale DEFAULT > Next > Next > Next
  - Setup
    - Stack Builter 4.2.2
    - Select `PostgreSQL 17 on...` > Next > Next
    - .... ? 
- Create DataBase
  - Open pgAdmin > Find the "Servers" directory and open the dropdown 
    - When prompted, enter password from earlier `okokok`
  - Now, right click on Databases > Create > 
    - name: pets
    - owner: postgres
    - SAVE
- Setup Prisma
   - `cd` into your project backend (must already have `npm init -y` at min.)
   - `npm install prisma --save-dev`
   - Open the `.env` file created by Prisma. Locate the DATABASE_URL variable and configure it with your PostgreSQL connection details: 
   - Change to your variables: `> POSTGRES_URL="postgresql://postgres:<password>@postgres:5432/<db_name>?schema=public"`
     - My Example: `DATABASE_URL="postgresql://postgres:okokok@localhost:5432/kudos?schema=public"`
- Add Schemea
- Migrate
  - `npx prisma migrate dev --name init_pets_table` (NOTE pets here is the pets db you made in prisma earlier)
    - `y`
  - When i first did this, I had the toys model noted out. 
- Lunch Prisma by running `npx prisma studio`
- Use Prisma browser to test by adding one record. NEED For testing `/pets`
- Hook up to DB, rather than pets.json
  - Added (THIS WAS the thing that was originally `require('@prisma/client')`)
    ```javascript
      const { PrismaClient } = require('./generated/prisma');
      const prisma = new PrismaClient();
    ```
- `nodemon index.js` 
  - ERROR!!!! got the sae issue with prisma. changed to `../generated/prisma` because i'm a level above now.
- `nodemon index.js` ✅

🙀 Need to change pgAdmin password (See folder of screenshots)
- Open pgAdmin > Server > PostgreSQL 17 > Login/group roles > posgres (Or whatever name is in your POSTGRESQL_URL)
- Right click posgres > Properties > Select the Definitio Tab. 
- Now add your new password and update the POSTGRESQL_URL in .env


# Development

Everything setup and installed? (No? Jump to "# Setup for Pets App ")
- Open 3 seperate Terminal tabs or windows & `cd` to into folders: 
  - frontend: `npm run dev` (Might not be implimented yet)
  - backend: `node index.js` (or `nodemon index.js` for hot reload)
  - backend: `npx prisma studio` (DB table views, or open pgAdmin)

To generate a migration (or update if changes are made):
- `npx prisma migrate dev --name init`

### Seeding (😱 NOTE! It's gonna wipe all your data!)
- `node prisma/seed_pets.js`


# Deployment

### Postgres DB
Start here: https://dashboard.render.com/
- Click [+ Add new]
  - Dropdown: Select: [postgres]
- Name: myapp-db (*you can do whatever)
- Project: *Leave empty*
- Database: *Leave empty*
- User: *Leave empty*
- Region: I selected Oregon US West
- PostgreSQL Version: 14
  - In Terminal run: `PostgreSQL Version` to get your version.
- Datadog API Key: *Leave empty*
- Datadog Region: *Leave empty*
- Plan Options: Free Basic. 

Click > [Create Database]

Get DATABASE_URL
- With the Info tab open, find the Connect dropdown 
- Copy the "Internal" URL

Update your DATABASE_URL
- In your code, find the `.env` file.
- Note out your local value for DATABASE_URL (You'll wanna save that)
- Now, add your new url: `DATABASE_URL="<your new URL here>"`

NOTE: This will not work when you try and run it locally!

### Node JS Server
Start here: https://dashboard.render.com/
- Click [+ Add new]
  - Dropdown: Select: [postgres]
- Connect your GitHub repo and pick your Node project
- Name: myapp-api (*you can do whatever)
- Language: Node
- Branch: main 
- Region: *should hopefully be already set to what you chose for DB*
- Root Directory: backend (Leave black if package.json is at root level of your repo)
- Build Command: npm install
- Start Command: npm start (or node index.js)
- Instance Type: Free
- Environment Variables: Add your `DATABASE_URL` as the key and then the value as the URL you got from PostGres DB setup.

Click > [Deploy Web Service]

Error on build ? (See more notes from kudos)
- When building the Web Service I got a long crypic error. 

# Setting up Kudos (Air) to develop on Meta Mac
- Clone repo.
- Install Insomnia (See `Course Portal: Starting Point for week 3.` 👆)

Frontend Setup
- `npm install` > ? `npm audit fix`
- `npm run dev`

Backend Setup
- Download & Install > pgAdmin (See Lab 3)
- Download & Install > postgreSQL (See Lab 3)