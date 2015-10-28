angular
    .module('app.services')

    .factory('AuthService', (User, $q, $rootScope) => {
        function login(email, password) {
            return User
                .login({ email, password })
                .$promise
                .then((response) => {
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email
                    };

                    return $rootScope.currentUser;
                })
                .catch(error => {
                    if(error.status === 401) {
                        return {
                            error: 'Username and password does not exist'
                        };
                    }
                });
        }

        return {
            login
        };
    });
