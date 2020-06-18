<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/docs/4.1/assets/img/favicons/favicon.ico">

    <title>PaB - Paint</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.1/examples/product/">

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/product.css" rel="stylesheet">
  </head>

  <body>
     <header class="site-header">
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">Instructions? No, no, just go crazy.</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Contact</h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white">Follow on Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
           <!--  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> -->
            <strong>PYB</strong>
          </a>
	  <a href="#" class="py-2 d-none d-sm-inline-block" color="black">
	    <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="orange"/></svg>
	  </a>
	  <a href="#" class="py-2 d-none d-sm-inline-block" color="blue">
	    <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="blue"/></svg>
	  </a>
	  <a href="#" class="py-2 d-none d-sm-inline-block" color="green">
	    <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="green"/></svg>
	  </a>
	  <a href="#" class="py-2 d-none d-sm-inline-block clear-drawing" title="Start again">Clear</a>
	  <a href="#" class="py-2 d-none d-sm-inline-block save-drawing" title="Upload your drawing">Share</a>
	  
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
    
    <div class="container" id="content" style="overflow: hidden;">
      <canvas id="canvas" width="960" height="600" style="margin-top: 5px;"></canvas>
      <div class="onscreen-interface" style="position: absolute; bottom: 20px; right: 20px;">
	  <a href="#" class="" color="black">
	    <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="orange"/></svg>
	  </a>
	  <a href="#" class="" color="blue">
	    <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="blue"/></svg>
	  </a>
	  <a href="#" class="" color="green">
	    <svg height="20" width="20"><circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="green"/></svg>
	  </a>
	  <a href="#" class="clear-drawing" title="Start again">Clear</a>
	  <a href="#" class="save-drawing" title="Upload your drawing">Share</a>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="https://code.jquery.com/jquery-3.5.1.min.js"><\/script>')</script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/holder.min.js"></script>
    <script src="js/all.js"></script>
    <script>
      Holder.addTheme('thumb', {
        bg: '#55595c',
        fg: '#eceeef',
        text: 'Thumbnail'
      });
    </script>
  </body>
</html>

