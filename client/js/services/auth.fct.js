angular
    .module('app.services')

    .factory('AuthService', (User, $q, $rootScope) => {
        function login(email, password) {
            return User
                .login({ email: email, password: password })
                .$promise
                .then((response) => {
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email
                    };
                });
        }

        return {
            login
        }
    });