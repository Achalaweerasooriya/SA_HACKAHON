'use strict';

angular.module('myApp.home', ['ngRoute','ngMaterial', 'ui.tree','ui.bootstrap','ngMessages','angular.filter'])


.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider) {
 
$mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  $routeProvider.when('/', {
    templateUrl: './home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location,filterFilter) {

$scope.data={};
$scope.search='';
$rootScope.userDetailsforCheckout=[];
//$scope.data.cb2 = true;
//$scope.userLogedIn = false;
//$rootScope.userDetails;
$scope.userLogedIn= false;
$scope.userList;
$scope.userListCatergoryChecked ={
  selected : {}
};
$scope.productList =[];
$scope.userCartList = [];

//$scope.userLogedIn = false;
   $scope.user={
                name : '',
                token : '' 
                                                 };

/*
*
*Add to CArt
*
*/
$scope.valueitem ={
  selected :{}
};

$scope.addToCart = function(item,quantity){
console.log(item);
console.log(quantity);
 $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>Loading . . . </h2>'+
                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<md-icon md-svg-src="logo_animated.svg"   aria-label="Close dialog"></md-icon>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                                   '<center><md-button  ng-click="cancel()">'+
                                  '<md-icon md-svg-src="finalLoading.svg" style="width:60px;height:60px;" aria-label="Close dialog"></md-icon>'+
                               ' </md-button></center>'+             
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            
                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose:false,
                              fullscreen: useFullScreen
                            })
                            .then(function(answer) {
                              $scope.status = 'You said the information was "' + answer + '".';
                            }, function() {
                              $scope.status = 'You cancelled the dialog.';
                            });
                            $scope.$watch(function() {
                              return $mdMedia('xs') || $mdMedia('sm');
                            }, function(wantsFullScreen) {
                              $scope.customFullscreen = (wantsFullScreen === true);
                            });
                          }};
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item,
            'quantity' : quantity
            
        };
                    $http.post('backend/addToCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt
                          
                          
                           $scope.showlist(); 
             $rootScope.loadCartList();
             $rootScope.loadProductList();
              $scope.loadCartList();
               $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
};
/*
*remove from cart
*/
$scope.removefromCart = function(item,quantity){
console.log(item);
console.log(quantity);
//alert("sad");
 $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>Loading . . . </h2>'+
                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<md-icon md-svg-src="logo_animated.svg"   aria-label="Close dialog"></md-icon>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                                   '<center><md-button  ng-click="cancel()">'+
                                  '<md-icon md-svg-src="finalLoading.svg" style="width:60px;height:60px;" aria-label="Close dialog"></md-icon>'+
                               ' </md-button></center>'+             
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            
                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose:false,
                              fullscreen: useFullScreen
                            })
                            .then(function(answer) {
                              $scope.status = 'You said the information was "' + answer + '".';
                            }, function() {
                              $scope.status = 'You cancelled the dialog.';
                            });
                            $scope.$watch(function() {
                              return $mdMedia('xs') || $mdMedia('sm');
                            }, function(wantsFullScreen) {
                              $scope.customFullscreen = (wantsFullScreen === true);
                            });
                          }};
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item,
            'quantity' : quantity
            
        };
                    $http.post('backend/removefromCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt
                          
                          
                           $scope.showlist(); 
                         $rootScope.loadCartList();
                         $rootScope.loadProductList();
                          $scope.loadCartList();
                           $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
};
//
/*
*editCart
*/
$scope.editCart = function(item,quantity){
console.log(item);
console.log(quantity);
//alert("sad");
 $scope.loading = true;
        $scope.loadingPromt = function(ev) {

                           if($scope.loading == true){
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak  >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>Loading . . . </h2>'+
                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<md-icon md-svg-src="logo_animated.svg"   aria-label="Close dialog"></md-icon>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                                   '<center><md-button  ng-click="cancel()">'+
                                  '<md-icon md-svg-src="finalLoading.svg" style="width:60px;height:60px;" aria-label="Close dialog"></md-icon>'+
                               ' </md-button></center>'+             
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            
                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              parent: angular.element(document.body),
                              targetEvent: ev,
                              clickOutsideToClose:false,
                              fullscreen: useFullScreen
                            })
                            .then(function(answer) {
                              $scope.status = 'You said the information was "' + answer + '".';
                            }, function() {
                              $scope.status = 'You cancelled the dialog.';
                            });
                            $scope.$watch(function() {
                              return $mdMedia('xs') || $mdMedia('sm');
                            }, function(wantsFullScreen) {
                              $scope.customFullscreen = (wantsFullScreen === true);
                            });
                          }};
       
 $scope.loadingPromt();
        var datai =  
        {
            'userId': JSON.parse( localStorage.getItem("userId") ),
            'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                
            'item' :item,
            'quantity' : quantity
            
        };
                    $http.post('backend/editCart.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        $scope.loading = false;
                        $scope.loadingPromt();
                       // console.log(status + ' - ' +data );
                        //console.log(data);
                            //prompt
                          
                          
                           $scope.showlist(); 
                         $rootScope.loadCartList();
                         $rootScope.loadProductList();
                          $scope.loadCartList();
                           $mdDialog.cancel();

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });
};
/*
*
*Search
*/

 // pagination controls
  $scope.currentPage ;
  $scope.totalItems;
  $scope.entryLimit ; // items per page
  $scope.noOfPages;


  $scope.search = '';

  $scope.$watch('search', function (newVal, oldVal) {
/* console.log($scope.items);*/
    $scope.filtered = filterFilter($scope.productList, newVal);  
    console.log(newVal);
    $scope.totalItems = $scope.filtered.length;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    $scope.currentPage = 1;
  }, true);
$scope.filterSearch = function(searchVariable){
  $scope.search ='';
  $scope.search =searchVariable;
};
  $scope.resetFilters = function () {
    // needs to be a function or it won't trigger a $watch
    $scope.search = '';
  };
var loadcount = true;
     $scope.random = function() {
    console.log(loadcount);
      if(loadcount == true){
       
    var x = 0.5 - Math.random();
     loadcount = false;
     return x;
}
else{
  return 0;
}
  };


/*
get product list 
*/
$rootScope.loadProductList=function(){
   
    $http.post('backend/loadProducts.php')
                    .success(function(data, status, headers, config)
                    {
                        $scope.productList = data;
                        console.log(status + ' products loaded - ' +data );
                        //console.log(data);
                            //prompt
                         
 // pagination controls
              $scope.currentPage = 1;
              $scope.totalItems = $scope.productList.length;
              $scope.entryLimit = 6; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};
/*
get cart list 
*/
$rootScope.loadCartList=function(){
    var senddata = {
                            
                            userId : JSON.parse( localStorage.getItem("userId") )
                    };
   
    $http.post('backend/loadCartList.php',senddata)
                    .success(function(data, status, headers, config)
                    {
                        $scope.userCartList = data;
                        console.log(status + ' loadCartList loaded - '  );
                  if($scope.userCartList.validator == "fail"){
                      //if(data.validator == undefined){
                        $scope.userCartList=[];
                         console.log(data);
  
                      }
                        else{
                       
                      
                       // console.log(data);
                        //console.log( $scope.userList.validator);
                       
                            //prompt
                         
                          }
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};

/*
*checkWhetherAddedToTheCart
*/
$scope.checkWhetherAddedToTheCart =function(item){
  var returnx= false;
   angular.forEach($scope.userCartList, function(value, key){

         if(value.productId == item.id){
          // console.log("item added");
           returnx = true;
          
         }
       
         
         
         });
   return returnx;
};
$scope.getAddedItem =function(item){
 var returnx= [];
   angular.forEach($scope.userCartList, function(value, key){

         if(value.productId == item.id){
           
           returnx = value;
          
         }
       
         
         
         });
   //console.log(returnx);
   return returnx;
};
/*
get product list 
*/
          //User list 
$scope.userListCatergoryChecked ={
  selected : {}
};

$scope.check =function(value,model){
  //console.log(value);
 // console.log(model);
  if(value == 'true'){
    //$scope.data.model =true;
    $scope.userListCatergoryChecked.selected[model] = true;
  //  console.log($scope.userListCatergoryChecked.selected[model]);
  }

};
//User list 
$rootScope.showlist = function(){
  var senddata = {
                            
                            userId : JSON.parse( localStorage.getItem("userId") )
                    };
                    $http.post('backend/getList.php', senddata)
                    .success(function(data, status, headers, config)
                    {
                       $scope.userList = data;
                      if($scope.userList.validator == "fail"){
                      //if(data.validator == undefined){
                        $scope.userList=[];
                         console.log(data);
  
                      }
                        else{
                       
                        console.log(status + ' list- ' +data );
                       // console.log(data);
                        //console.log( $scope.userList.validator);
                       
                            //prompt
                         
                          }
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};
$rootScope.getUserDetails = function(){
  var senddata = {
                            
                            userId : JSON.parse( localStorage.getItem("userId") )
                    };
                    $http.post('backend/getUserDetails.php', senddata)
                    .success(function(data, status, headers, config)
                    {
                       $rootScope.userDetailsforCheckout = data;
                      if($rootScope.userDetailsforCheckout.validator == "fail"){
                      //if(data.validator == undefined){
                        $rootScope.userDetailsforCheckout=[];
                   
  
                      }
                        else{
                       
                        //console.log(status + ' user- ' +data );
                       //console.log(data);
                        //console.log( $scope.userList.validator);
                       
                            //prompt
                         
                          }
                      

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

};
//
//User list 
/*
*
*prompt notification 
*/
$scope.showPromptCity = function(ev) {
    if( localStorage.getItem("userName") != null || localStorage.getItem("userToken") != null ){
  //  console.log(localStorage.getItem("userName"));
   //  $location.path('/');
   /*  $rootScope.userDetails={
                name : JSON.parse( localStorage.getItem("userName") ),
                token : JSON.parse( localStorage.getItem("userToken") )
                                                 };
                                                 console.log( $rootScope.userDetails);*/
                                                 $scope.user={
                name : JSON.parse( localStorage.getItem("userName") ),
                token : JSON.parse( localStorage.getItem("userToken") )
                                                 };
                                                 console.log( $scope.user);
             $scope.userLogedIn = true;
             $rootScope.showlist(); 
             $rootScope.loadCartList();
             $rootScope.loadProductList();
              $scope.loadCartList();
               $rootScope.getUserDetails();
             

                  
                                              
  }

else{
$rootScope.loadProductList();

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({

      template: ''+
      '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak ng-controller="registerCtrl" >'+
  '<form>'+
   ' <md-toolbar>'+
      '<div class="md-toolbar-tools">'+
        '<h2>Welcome To ApeKade</h2>'+
        '<span flex></span>'+
        '<md-button class="md-icon-button" ng-click="cancel()">'+
          '<md-icon md-svg-src="logo_animated.svg" aria-label="Close dialog"></md-icon>'+
       ' </md-button>'+
      '</div>'+
   '</md-toolbar>'+
   '<md-dialog-content>'+

     '<div class="md-dialog-content">'+
   '<center><h2 >Please Select Your Delivery Location</h2></center>'+
        ' </md-input-container>'+
         '            <md-input-container class="md-block" flex-gt-sm>'+
          '            <label><i class="fa fa-map-signs" aria-hidden="true"></i> City</label>'+
           '           <md-select ng-model="user.state" ng-change=" "  required>'+
            '            <md-option ng-repeat="state in states" value="{{state.abbrev}}">'+
             '             {{state.abbrev}}'+
              '          </md-option>'+
               '       </md-select>'+
                '    </md-input-container>'+
                             /* ' <md-autocomplete'+
                        ' ng-disabled="isDisabled"'+
                        ' md-no-cache="noCache"'+
                        ' md-selected-item="selectedItem"'+
                        ' md-search-text-change="searchTextChange(searchText)"'+
                        ' md-search-text="searchText"'+
                        ' md-selected-item-change="selectedItemChange(item)"'+
                        ' md-items="item in querySearch(searchText)"'+
                        ' md-item-text="item.display"'+
                        ' md-min-length="0"'+
                        ' placeholder="What is your favorite US state?">'+
                      ' <md-item-template>'+
                       ' <span md-highlight-text="searchText" md-highlight-flags="^i">{{item.display}}</span>'+
                      ' </md-item-template>'+
                      ' <md-not-found>'+
                        ' No states matching "{{searchText}}" were found.'+
                        ' <a ng-click="newState(searchText)">Create a new one!</a>'+
                      ' </md-not-found>'+
                      ' </md-autocomplete>'+*/
   ' </md-dialog-content>'+
   ' <md-dialog-actions layout="row">'+
    '  <span flex></span>'+
    "  <md-button ng-click='update(user.state)' ng-disabled='!user.state' >"+
    '   OK'+
     ' </md-button>'+
    
   ' </md-dialog-actions>'+
 ' </form>'+
'</md-dialog>'
      ,
                              controller: function($scope, $mdDialog) {


                                                $scope.hide = function() {
                                                    $mdDialog.hide();

                                                };

                                                $scope.cancel = function() {

                                                    $mdDialog.cancel();

                                                };

                                            },
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  }
  };

   $scope.states = ('Kandy ( Zip Code :20801 ) & Kantugastota( Zip:20800 ) & Colombo ').split('&').map(function(state) {
        return {abbrev: state};


      });

/*   $scope.pagination=function(){
    // pagination controls
              $scope.currentPage = 1;
              $scope.totalItems = $scope.productList.length;
              $scope.entryLimit = 6; // items per page
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
   };*/
  /*
  *
  *finish user destination
  *
  */
//console.log("sad");
$scope.logout = function(){
  
  $scope.userList = [];
localStorage.clear();
$scope.showAlert = function(ev){
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Successfully Logged-Out')
                    .textContent(' ')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('ok!')
                    .targetEvent(ev)
                );
             };
              $scope.showAlert();
                 $rootScope.showlist(); 
             $rootScope.loadCartList();
             $rootScope.loadProductList();
              $scope.loadCartList();
               $rootScope.getUserDetails();
$location.path('/');
     $scope.userLogedIn = false;

};


$scope.goToLogin = function(){
  $location.path('/login');
};
$scope.goToRegister = function(){
  $location.path('/register');
};



/*
*
*checkout 
*
*/
$scope.checkout=function(){

                           
                            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                            $mdDialog.show({

                              template: ''+
                              '<md-dialog aria-label="Welcome To ApeKade"  ng-cloak ng-controller="registerCtrl" style="min-width: 83.5%;;left:8.5%;min-height:92%;margin-top:40px; " >'+
                          '<form>'+
                           ' <md-toolbar>'+
                              '<div class="md-toolbar-tools">'+
                                '<h2>Checkout                                   </h2>'+

                                '<span flex></span>'+
                                '<md-button class="md-icon-button" ng-click="cancel()">'+
                                  '<i class="fa fa-times" aria-hidden="true"></i>'+
                               ' </md-button>'+
                              '</div>'+
                           '</md-toolbar>'+
                           '<md-dialog-content>'+

                             '<div class="md-dialog-content">'+
                          
                          ' <md-input-container class="md-block" style="width:30%;"> '+
                            '<label>Search</label>  '+
                            '<input  ng-model="searchss">'+
                         ' </md-input-container>'+ 
                          '<table class="table table-hover">'+
                             '<thead>'+
                                  '<tr>'+
                                    '<th>No</th>'+
                                    '<th>Product</th>'+
                                    '<th>Quantity</th>'+
                                    '<th>Subtotal</th>'+
                                    '<th></th>'+
                                  '</tr>'+
                                '</thead>'+
                                 '<tbody>'+
                           /*     '<div ng-repeat="item in userCartList| filter: searchss | groupBy: \'productCatergory\'   ">'+
                   '<a href="javascript:;" data-toggle="collapse" ng-click="filterSearch(key)" data-target="#de{{$index}}">   '+
 '<md-checkbox class="green" ng-click="filterSearch(key)" ng-model="userListCatergoryChecked.selected[key]" ng-checked="false" style="margin-bottom: 1px;" ></md-checkbox>'+
 
  '                       {{key}}<i class="fa fa-fw fa-caret-down"></i></a>'+
                        '<ul id="de{{$index}}" class="expand">'+
                            '<li ng-repeat="item in value">'+
                                '<div ng-init="check(item.statusAddedToCart,[key]);"></div>'+
                                '<a href="#!/" ng-click="filterSearch(item.productName)">{{item.productName}} <span ng-if="item.statusAddedToCart== \'true\'" style="    color: green;">   <i class="fa fa-check" aria-hidden="true"></i></span></a>'+
                            '</li>'+*/
                            
                           /*  '<table class="table table-hover">'+
                             '<thead>'+
                                  '<tr>'+
                                    '<th>Product</th>'+
                                    '<th>Quantity</th>'+
                                    '<th>Subtotal</th>'+
                                    '<th></th>'+
                                  '</tr>'+
                                '</thead>'+*/
                             '   <tr ng-repeat="item in userCartList| filter: searchss   ">'+
                                 '<td>{{$index+1}} </td>'+

                                  '<td>{{item.productName}} </td>'+
                                  '<td>{{item.productQuantity}}</td>'+
                                  '<td>Rs.{{item.productQuantity * item.unitCostPrice}}.00</td>'+
                                  '<td><span ng-click="removefromCart(item,item.productQuantity)"><i class="fa fa-times" aria-hidden="true"></i></span> </td>'+
                                '</tr>'+
                           
/*
                        '</ul>'+
                    '</li>'+
                        '</ul>'+*/
                    '</div>'+
                    '<tr style="color:darkblue;font-weight:800;">'+ 

                     '<td> </td>'+

                                  '<td></td>'+
                                  '<td>Total :</td>'+
                                  '<td>Rs. {{ getTotal() }}.00</td>'+
                                  '<td></td>'+
                               +
                              '</tbody>'+
  '</table>'+
   '<table >'+
    '<tbody>'+ 

                                  '</tr>'+
                                 '<tr style="color:#999;font-weight:800;" >'+ 
                
                                  '<td>Email :</td>'+
                                  '<td> {{ userEmailforcheckout }}</td>'+
                                 
                               
                                  '</tr>'+
                                     '<tr style="color:#999;font-weight:800;" >'+ 
                     
                                  '<td>Phone Number :</td>'+
                                  '<td> {{ userphoneNumberforcheckout }}</td>'+
                                 
                               
                                  '</tr>'+
                                     '<tr style="color:#999;font-weight:800;" >'+ 
                     
                                  '<td>Address :</td>'+
                                  '<td> {{ useraddressforcheckout }}</td>'+
                                 
                               
                                  '</tr>'+
                                     '<tr style="color:#999;font-weight:800;" >'+ 
                   
                                  '<td>City :</td>'+
                                  '<td> {{ usercityforcheckout }}</td>'+
                                 
                               
                                  '</tr>'+
                                  '</tr>'+
                                     '<tr style="color:#999;font-weight:800;" >'+ 
                   
                                  '<td>Order Reference Number :</td>'+
                                  '<td> {{ random }}</td>'+
                                 
                               
                                  '</tr>'+
                                           '</tbody>'+
  '</table>'+   //new
            
             
             
          

            '</div>'+               
                           ' </md-dialog-content>'+
                           ' <md-dialog-actions layout="row">'+
                            '  <span flex></span>'+
                            "  <md-button style='background:#03A9F4;color:white;'  ng-click='"+"skip()"+"' >"+
                            '   SKIP'+
                             ' </md-button>'+
                              "  <md-button style='background:#03A9F4;color:white;'  ng-click='"+"cancel()"+"' >"+
                            '   SAVE'+
                             ' </md-button>'+
                         

                           ' </md-dialog-actions>'+
                         ' </form>'+
                        '</md-dialog>',
                              controller: function($scope,$mdDialog, $mdMedia,$rootScope,$http,$location) {

                                                          //$scope.items = ["asd","sad",3,4,5,"asdsadas","asdsadsaassd",32,42,52,"asdsaadas","asdsadqsaasd",31,41,51,"asdesadas","asdsad2saasd"];
                                                         //new
                                                        
                                                            $scope.random = 159812*  Math.floor((Math.random() * 100) + 1);
                                                            $scope.userEmailforcheckout=$rootScope.userDetailsforCheckout[0].email;

                                                            $scope.userphoneNumberforcheckout=$rootScope.userDetailsforCheckout[0].phoneNumber;
                                                            $scope.useraddressforcheckout=$rootScope.userDetailsforCheckout[0].address;
                                                            $scope.usercityforcheckout=$rootScope.userDetailsforCheckout[0].city;
                                                             $scope.userCartList=[];
                                                         $scope.getTotal = function(){
                                                              var total = 0;
                                                              for(var i = 0; i < $scope.userCartList.length; i++){
                                                                  var product = $scope.userCartList[i];
                                                                  total += (product.productQuantity * product.unitCostPrice);
                                                              }
                                                              return total;
                                                          };
                                     /*
                                            get cart list 
                                            */
                                            $scope.loadCartList2=function(){
                                                var senddata = {
                                                                        
                                                                        userId : JSON.parse( localStorage.getItem("userId") )
                                                                };
                                               
                                                $http.post('backend/loadCartList.php',senddata)
                                                                .success(function(data, status, headers, config)
                                                                {
                                                                    $scope.userCartList = data;
                                                                    console.log(status + ' loadCartList loaded - '  );
                                                              if($scope.userCartList.validator == "fail"){
                                                                  //if(data.validator == undefined){
                                                                    $scope.userCartList=[];
                                                                     console.log(data);
                                              
                                                                  }
                                                                    else{
                                                                   
                                                                  
                                                                   // console.log(data);
                                                                    //console.log( $scope.userList.validator);
                                                                   
                                                                        //prompt
                                                                     
                                                                      }
                                                                  

                                                                })
                                                                .error(function(data, status, headers, config)
                                                                {
                                                                    console.log('error');
                                                                });

                                            };

                                            $scope.loadCartList2();
                                            $scope.check =function(value,model){
                                              //console.log(value);
                                             // console.log(model);
                                              if(value == 'true'){
                                                //$scope.data.model =true;
                                                $scope.userListCatergoryChecked.selected[model] = true;
                                              //  console.log($scope.userListCatergoryChecked.selected[model]);
                                              }

                                            };

                                            $scope.removefromCart = function(item,quantity){
                                                        console.log(item);
                                                        console.log(quantity);
                                                        //alert("sad");
                                                        
                                                                var datai =  
                                                                {
                                                                    'userId': JSON.parse( localStorage.getItem("userId") ),
                                                                    'userEmail': JSON.parse( localStorage.getItem("userEmail") ),
                                                                        
                                                                    'item' :item,
                                                                    'quantity' : quantity
                                                                    
                                                                };
                                                                            $http.post('backend/removefromCart.php', datai)
                                                                            .success(function(data, status, headers, config)
                                                                            {
                                                                               
                                                                               // console.log(status + ' - ' +data );
                                                                                //console.log(data);
                                                                                    //prompt
                                                                                  
                                                                                  
                                                                                   $rootScope.showlist(); 
                                                                                 $rootScope.loadCartList();
                                                                                 $rootScope.loadProductList();
                                                                                  $scope.loadCartList2();
                                                                                   $scope.getTotal();
                                                                                   //$mdDialog.cancel();

                                                                            })
                                                                            .error(function(data, status, headers, config)
                                                                            {
                                                                                console.log('error');
                                                                            });
                                                        };
                                                         //new
                                                          $scope.selected = [];
                                                          $scope.toggle = function (item, list) {
                                                            var idx = list.indexOf(item);
                                                            if (idx > -1) {
                                                              list.splice(idx, 1);
                                                            }
                                                            else {
                                                              list.push(item);
                                                            }
                                                          };
                                                          $scope.exists = function (item, list) {
                                                            return list.indexOf(item) > -1;
                                                          };
                                                          $scope.removeItem = function(index){
                                                              $scope.selected.splice(index, 1);
                                                            };
                                                          $scope.hide = function() {
                                                              $mdDialog.hide();

                                                          };
                                                          $scope.skip = function() {

                                                              $mdDialog.cancel();

                                                               $location.path('/');

                                                          };
                                                          $scope.cancel = function() {
                                                           // console.log($scope.selected);
                                                          
                                                            $mdDialog.cancel();
                        

                                                          };

                                            },
                              parent: angular.element(document.body),
                              clickOutsideToClose:true,
                              fullscreen: useFullScreen
                            })
                            .then(function(answer) {
                              $scope.status = 'You said the information was "' + answer + '".';
                            }, function() {
                              $scope.status = 'You cancelled the dialog.';
                            });
                            $scope.$watch(function() {
                              return $mdMedia('xs') || $mdMedia('sm');
                            }, function(wantsFullScreen) {
                              $scope.customFullscreen = (wantsFullScreen === true);
                            });
                        
                            //prompt

                         
};


});
