angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'app.core',
        'app.services'
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'js/sections/auth/login.tpl.html',
                controller: 'AuthLoginController'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'js/sections/home/home.tpl.html',
                controller: 'HomeController'
            });

        $urlRouterProvider.otherwise('login');
    })

    .run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if(next.authenticate && !$rootScope.currentUser) {
                event.preventDefault();
                $state.go('forbidden');
            }
        });
    });
