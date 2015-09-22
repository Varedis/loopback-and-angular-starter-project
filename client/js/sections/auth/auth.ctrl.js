angular
    .module('app.core')

    .controller('AuthLoginController', ($scope, $state, AuthService) => {
        $scope.login = () => {
            AuthService.login($scope.user.email, $scope.user.password)
                .then(() => $state.go('home'))
        }
    });