angular.module('Lm').config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: '/views/main_nav.html'
  }).when('/fertilizadoras', {
    templateUrl: '/views/fertilizadoras.html',
    controller: 'FertilizadorasCtrl'
  }).when('/fertilizadoras/reporte', {
    templateUrl: '/views/fertilizadoras_reporte.html',
    controller: 'FertilizadorasReporteCtrl'
  });
});
