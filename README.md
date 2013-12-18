#angular-slim-redbean-quick-mysql
================================

[live app](http://sotos.gr/demos/test/angular-slim-redbean-quick-mysql)

demo test app with angular create tables and fields in mysql

api RESTful service created with Slim and RedBeanPHP for connection to mysql database
is for use test for localhost :P the app create automatic tables in mysql database
fields in the tables create automatic by selecting type of input in new record

create new table navigate to localhost:8000/#!/{yourtablename} 

# RESTful service
Install the [Slim](http://www.slimframework.com)
Download the [RedBeanPHP](http://www.redbeanphp.com) copy in to folder of your api.
with slim and the `api/index.php` of files. apiurl like `http://localhost/api/ or http://localhost/my_api/api/`.

create database in your mysql.
edit the index.php and fix the mysql connection.
setup the REDBEANPHP
`R::setup('mysql:host=localhost;dbname=yourdatabase','username','password');`
after if you navigate to your localhost/api get array of tables of your database.

# Instructions
app create with lineman and angular
for my api Slim enable the config/application.js API Proxying 

`server: {
     apiProxy: {
     prefix:'/my_api/',
     enabled: true,
     host: 'localhost',
     port: 80
     }
     }`

and set the dataService path in file services.js 
     `return $resource('my_api/api/:data/:id', {}, {});`

#install     
     
1. `git clone https://github.com/sotospez/angular-slim-redbean-quick-mysql.git my-app`
2. `cd my-app`
3. `npm install -g lineman`
4. `npm install`
5. `make the settings`
7. `lineman run`
6. open your web browser to localhost:8000
