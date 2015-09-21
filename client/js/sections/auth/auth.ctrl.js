angular
    .module('app.core')

    .controller('AuthLoginController', function($scope, $state, AuthService) {
        $scope.user = {
            email: 'foo@bar.com',
            password: 'foobar'
        };

        $scope.login = function() {
            AuthService.login($scope.user.email, $scope.user.password)
                .then(function() {
                    $state.go('home');
                })
        }
    });