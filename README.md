# Covered Web App

The Covered website, patient dashboard, and provider dashboard.

## NOTICE

This is the repository for a project I conducted with 4 main teammates: Niko Fotopolous (Princeton '21), Ricky Pati (UPenn '21), Charles An (Princeton '22), and Ilene E (Princeton '21).

Ricky and Niko were the co-founders and business focused team-members, while Charles handled the back end, and I handled the front end with Ilene.

This project was meant to be the website for a medical billing startup called Covered, which we ran for the summer of 2020. After a lot feedback from potential customers and the looming start of the new schoolyear, we decided to stop development on the application.

I am releasing our codebase on GitHub for anyone who is interested in seeing what a SpringBoot and React app can look like!

**Note:** A top level folder called `logos` contains our logos, and one called `portfolio` contains a portfolio of our site.

## Prerequisites

* [npm](https://www.npmjs.com/get-npm)
* [PostgreSQL](https://www.postgresql.org/download/)

## Building

Run the following command to build and bundle frontend files:

```bash
npm run build
```

## Testing Locally

### DO NOT PUSH THESE CHANGES

You can tell git not to update these files in case you accidentally commit them
by running the following commands:

```bash
git update-index --assume-unchanged src/main/resources/application.properties
git update-index --assume-unchanged webpack.config.js
```

You can undo this change by running the following commands:

```bash
git update-index --no-assume-unchanged src/main/resources/application.properties
git update-index --no-assume-unchanged webpack.config.js
```

You can list all files that are `assume-unchanged` with the following command:

```bash
git ls-files -v|grep '^h'
```

### `src/main/resources/application.properties`

Replace `spring.datasource.url=${JDBC_DATABASE_URL}` with the following:

```properties
# spring.datasource.url=${JDBC_DATABASE_URL}
spring.datasource.url=jdbc:postgresql://ec2-54-146-4-66.compute-1.amazonaws.com:5432/d2ikjtgh8dmhpd?sslmode=require
spring.datasource.username=sdevjztcjkcuxu
spring.datasource.password=f160f3eaa24957c7dba158a61dbc68411b146823846d32a15defe63990ac82ee
```

### `webpack.config.js`

Add `watch: true,` under `mode: 'development',`.

### Running The Test Server

Give the start script proper permissions with the following:

```bash
chmod 755 mvnw
```

Use the following command to run the test server (takes ~1 minute):

```bash
./mvnw spring-boot:run
```

Default test login credentials are the following:

```properties
Username: nsf2@princeton.edu
Password: password
```
