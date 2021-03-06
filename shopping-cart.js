
//Shopping Cart API
var shoppingCart = (function () {
  
    cart = [];

    //Instructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    //Save Cart
    function saveCart() {
       localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    //Load Cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
    }



var obj = {};


//Add to Cart
obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
        if (cart[item].name === name) {
            cart[item].count++;
            saveCart();
            return;
        }
    }
    var item = new Item(name, price, count);
cart.push(item);
saveCart();
}

//Set count from item
obj.setCountforItem = function (name, count) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count = count;
            break;
        } 
    }
};
    
// Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }
//Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
            } if (cart[item].count >=1) {
                cart.splice(item);
            }
            break;
        }
        saveCart();
    }
//Item Total in Cart
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

//Total Cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

//List Cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

//Trigger / Events

$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});


//Display Cart
$('.btn-cart').click(function () {
    $(".modal").toggle();
})

//close cart
$('.btn-secondary').click(function () {
    $(".modal").toggle();
})

//clear items
$('.clear-cart').click(function () {
    shoppingCart.removeItemFromCartAll();
    displayCart();
});

//order now button
$('.order-now').click(function () {
    if (shoppingCart.totalCart() > 0) {
        $(".modal").toggle();
        shoppingCart.removeItemFromCartAll();
        displayCart();
        alert('Thank you for your order')
    } else {
        alert('There is nothing in your cart')
        $(".modal").toggle();
    }
})

//search bar
const search = document.getElementById('search');

search.addEventListener("keyup", e => {
    const searchString = e.target.value;
    
})

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td> (" + cartArray[i].price + ")</td>"
            + "<td><div class = 'input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = " 
            + "<td>" + cartArray[i].total + "</td>" 
            +  "</tr>";
        }
        $('.show-cart').html(output);
        $('.total-cart').html(shoppingCart.totalCart());
        $('.total-count').html(shoppingCart.totalCount());
      }
      
      // Delete item button
      
      $('.show-cart').on("click", ".delete-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
      })
      
      
      // -1
      $('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
      })
      // +1
      $('.show-cart').on("click", ".plus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.addItemToCart(name);
        displayCart();
      })
      
      // Item count input
      $('.show-cart').on("change", ".item-count", function(event) {
         var name = $(this).data('name');
         var count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
      });
      
      displayCart();
      
      
