const MainController = ['$scope', '$http', '$sce', '$route', '$location', '$timeout', '$routeParams', function (scope, http, $sce, $route, $location, $timeout, $routeParams) {
    scope.TEMPLATES = window.resource.TEMPLATES;
    scope.CSS       = window.resource.CSS;

    scope.config = {
        show: {
            modal: false
        },
        loading: {
            productList: false
        }
    };

    scope.formatPrice = formatPrice;

    scope.data = {
        search: null,
        midSearch: null,
        cart: {
            productList: []
        },
        account: null,
        accountList: [],
        productList: []
    };

    scope.setSearch = function() {
        scope.data.search = scope.data.midSearch;
        scope.data.midSearch = null;
    };

    scope.getCartQuantity = function() {
        if(scope.data.cart.productList.length <= 0) return 0;
        let result = 0;
        result = scope.data.cart.productList.reduce(function(a = {qtd: 0}, b = {qtd: 0}) {
            return {qtd: a.qtd + b.qtd};
        }).qtd;
        return result;
    };

    scope.getCartPrice = function() {
        if(scope.data.cart.productList.length  < 1) return 0;
        if(scope.data.cart.productList.length == 1) return scope.data.cart.productList[0].price * scope.data.cart.productList[0].qtd;
        let result = 0;
        result = scope.data.cart.productList.reduce(function(a = {price: 0, qtd: 0}, b = {price: 0, qtd: 0}) {
            return {price: (a.price * a.qtd) + (b.price * b.qtd), qtd: 1};
        }).price;
        return result;
    };

    scope.setShowModal = function() {
        scope.config.show.modal = true;
    };

    scope.setHideModal = function() {
        scope.config.show.modal = false;
    };

    scope.setSelectedAccount = function(account) {
        if(!account) account = scope.data.accountList[0];
        scope.data.account = account;
        scope.setHideModal();
    };

    scope.getMenuActived = function(item) {
        let itemActived = scope.config.show.modal ? 'contas' : 'home';
        return item == itemActived;
    };

    scope.addProductQuantity = function(product, qtd = 1) {
        product.qtd += qtd;
    };

    scope.removeProductQuantity = function(product, qtd = 1) {
        if(product.qtd - qtd < 1) qtd = 0;
        product.qtd -= qtd;
    };

    scope.addProductToCart = function(product) {
        let productInCart = scope.data.cart.productList.find(p => p.id == product.id);
        if(productInCart) {
            productInCart.qtd += product.qtd;
        }else {
            scope.data.cart.productList.push({...product});
        }
        product.qtd = 1;
    };

    scope.init = function() {
        scope.data.accountList = accountList;
        scope.setSelectedAccount();
    };
}];