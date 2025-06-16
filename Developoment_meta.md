# Setup
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


# Deployment
- render.com > Log in > Dashbaord (dashboard.render.com)
- 🚨 My initial project expired (they said suspended)
- So, going through the same process, but adding `2` to all the projects, names, etc.

# Setting up Kudos (Air) to develop on Meta Mac
- Clone repo.
- Install Insomnia (See `Course Portal: Starting Point for week 3.` 👆)

Frontend Setup
- `npm install` > ? `npm audit fix`
- `npm run dev`

Backend Setup
- Download & Install > pgAdmin (See Lab 3)
- Download & Install > postgreSQL (See Lab 3)