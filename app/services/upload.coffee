angular.module 'Lm'
.factory 'Upload', ($q, $rootScope, $http) ->
  file: (ruta, tipo, file, reporte) ->
    def = $q.defer()
    fd = new FormData();
    fd.append('file', file)
    fd.append('tipo', tipo)
    fd.append('reporte', reporte)
    $http.post ruta, fd,
      headers: {'Content-Type': undefined},
      transformRequest: angular.identity
    .then () ->
      def.resolve()
    .catch () ->
      def.reject()
    def.promise
