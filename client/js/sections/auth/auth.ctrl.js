angular
    .module('app.core')

    .controller('AuthLoginController', ($scope, $state, AuthService) => {
        $scope.login = () => {
            AuthService.login($scope.user.email, $scope.user.password)
                .then((response) => {
                    if (response.error) {
                        $scope.error = response.error;
                        return;
                    }

                    return $state.go('home');
                });
        };
    });
