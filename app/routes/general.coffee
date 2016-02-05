angular.module 'Lm'
.config ($routeProvider) ->
	$routeProvider
  .when '/',
		templateUrl: '/views/main_nav.html'
	.when '/fertilizadoras',
		templateUrl: '/views/fertilizadoras.html'
		controller: 'UploaderCtrl'
	.when '/fertilizadoras/reporte',
		templateUrl: '/views/fertilizadoras_reporte.html'
		controller: 'FertilizadorasReporteCtrl'
	.when '/depreciaciones',
		templateUrl: '/views/depreciaciones.html'
		controller: 'UploaderCtrl'
	.when '/sueldos',
		templateUrl: '/views/personas.html'
		controller: 'UploaderCtrl'
