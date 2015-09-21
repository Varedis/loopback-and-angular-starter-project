angular
    .module('app.services')

    .factory('AuthService', function(User, $q, $rootScope) {
        function login(email, password) {
            return User
                .login({ email: email, password: password })
                .$promise
                .then(function(response) {
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email: email
                    };
                });
        }

        return {
            login: login
        }
    });