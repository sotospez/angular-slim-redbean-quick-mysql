<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';
require 'rb.php';
\Slim\Slim::registerAutoloader();

//setup the REDBEANPHP
R::setup('mysql:host=localhost;dbname=db','root','');

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();
$app->add(new \Slim\Middleware\ContentTypes());


/*
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */




// GET list of tabls
$app->get('/', function () use ($app)  {
	$listOfTables = R::inspect();
	
	echo   json_encode( $listOfTables );
});



$app->get('/:data',
			function ($data) use ($app) {
				$articles = R::find($data);
				echo  json_encode( R::exportAll($articles ));
}
);

$app->get('/:data/:id',
		function ($data,$id) use ($app) {
		$mytable = R::load($data, $id);
    	echo  $mytable;
	}
);
// POST route
$app->post('/:data',
     function ($data) use ($app) {
   $request = $app->request();
   $body = $request->getBody();
   $mytable = R::dispense($data);
   $mytable->import($body);
   $id = R::store($mytable);
   $mytable = R::load($data, $id);
   echo $mytable;
    }
);

// PUT route
$app->put('/:data',
     function ($data) use ($app) {
   $request = $app->request();
   $body = $request->getBody();
   $mytable = R::dispense($data);
   $mytable->import($body);
   $id = R::store($mytable);
   $mytable = R::load($data, $id);
   echo $mytable;
    }
);
// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete('/:data/all',
    function ($data)  use ($app){
		 $mytable = R::dispense($data);
		 R::trashAll( $data );
		
        echo '{}';
    }
);

// DELETE route
$app->delete('/:data/:id',
    function ($data,$id)  use ($app){
        $mytable = R::load($data, $id);
		R::trash( $mytable );
        echo R::trash( $mytable );
    }
);
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();

