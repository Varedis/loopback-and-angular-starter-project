angular
    .module('app.core')

    .controller('AuthLoginController', function($scope, $state, AuthService) {
        $scope.user = {
            email: 'foo@bar.com',
            password: 'foobar'
        };

        $scope.login = () => {
            AuthService.login($scope.user.email, $scope.user.password)
                .then(() => $state.go('home'))
        }
    });