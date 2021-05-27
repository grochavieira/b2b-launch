const CartController = ['$scope', '$http', '$sce', '$route', '$location', '$timeout', '$routeParams', function (scope, http, $sce, $route, $location, $timeout, $routeParams) {
    
    scope.setOrder = async function() {
        try {
            return await new Promise(function(resolve) {
                try {
                    callRemoteAction('LA_Controller.setOrder', {
                        accountId: scope.data.account.id,
                        productList: angular.fromJson(angular.toJson(scope.data.cart.productList))
                    }, function(result, event) {
                        resolve({
                            result: result,
                            event: event
                        })
                    });
                } catch (e) {
                    console.error('error', e);
                    Swal.fire({
                        type: 'warning',
                        title: 'Ooops',
                        html: '[1] Ocorreu um erro, tente novamente mais tarde...'
                    });
                }
            });
        } catch (error) {
            console.error('error', error);
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[2] Ocorreu um erro, tente novamente mais tarde...'
            });
            return error;
        }
    };

    scope.handle_setOrder = async function() {
        scope.config.loading.setOrder = true;
        try {
            let {result, event} = await scope.setOrder();
            if(event && result) {
                if(!result.hasError) {
                    Swal.fire({
                        type: 'success',
                        title: 'Pedido realizado com sucesso!',
                        html: result.message
                    }).then(function(response) {
                        scope.data.cart.productList = [];
                        $location.path('/');
                        scope.$apply();
                    });
                }else {
                    Swal.fire({
                        type: 'warning',
                        title: 'Ooops',
                        html: result.message
                    }); 
                }
            }else {
                Swal.fire({
                    type: 'warning',
                    title: 'Ooops',
                    html: '[4] Ocorreu um erro, tente novamente mais tarde...'
                }); 
            }   
        } catch (error) {
            console.error('error', error);
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[3] Ocorreu um erro, tente novamente mais tarde...'
            });            
        }
        scope.config.loading.setOrder = false;
        scope.$apply();
    };

    scope.deleteFromCart = function(product, confirm = false) {
        if(!confirm) {
            Swal.fire({
                type: 'question',
                title: 'Tem certeza?',
                html: 'Deseja remover <strong>'+product.name+'</strong> do carrinho?',
                confirmButtonText: 'Sim, desejo remover',
                showCancelButton: true,
                cancelButtonText: 'Não, manter produto',
            }).then(function(response) {
                if(response.value) {
                    scope.deleteFromCart(product, true);
                }
            });
            return false;
        }
        let index = scope.data.cart.productList.findIndex(p => p.id == product.id);
        scope.data.cart.productList.splice(index, 1);
        scope.$apply();
    };

    scope.init = function() {
        // scope.handle_getProductList();
    };

}];