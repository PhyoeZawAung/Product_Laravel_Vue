<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel SPA</title>
</head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
<link rel="stylesheet" href="{{mix('/css/app.css')}}"/>
<body>
  <div id="app">
    <product-component></product-component>
    <vue-progress-bar></vue-progress-bar>
  </div>

    <script src="{{mix('/js/app.js')}}"></script>
</body>

</html>