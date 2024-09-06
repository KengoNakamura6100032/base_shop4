document.addEventListener('DOMContentLoaded', function () {
    // カート機能
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.innerText = itemCount;
        }
    }

    updateCartCount(); // どのページでもカートのカウントを更新

    if (document.querySelector('.product-list')) {
        // ホームページの処理
        const addToCartBtns = document.querySelectorAll('.addToCartBtn');

        addToCartBtns.forEach(function (btn) {
            btn.onclick = function () {
                const product = btn.getAttribute('data-product');
                const price = parseInt(btn.getAttribute('data-price'));
                let item = cart.find(item => item.product === product);
                if (item) {
                    item.quantity++;
                } else {
                    cart.push({ product: product, price: price, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('カートに追加しました');
                updateCartCount();
            }
        });
    }

    if (document.querySelector('.cart-items')) {
        // カートページの処理
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalAmount = document.getElementById('cart-total-amount');
        const checkoutBtn = document.getElementById('checkoutBtn');

        function updateCart() {
            cartItemsContainer.innerHTML = '';
            let totalAmount = 0;
            cart.forEach(function (item) {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <h3>${item.product}</h3>
                    <p>価格: ¥${item.price}</p>
                    <p>数量: 
                        <input type="number" value="${item.quantity}" min="1" data-product="${item.product}" class="quantityInput">
                    </p>
                    <p>小計: ¥${item.price * item.quantity}</p>
                `;
                cartItemsContainer.appendChild(cartItem);
                totalAmount += item.price * item.quantity;
            });
            cartTotalAmount.innerText = `¥${totalAmount}`;
        }

        updateCart();

        cartItemsContainer.addEventListener('change', function (e) {
            if (e.target.classList.contains('quantityInput')) {
                const product = e.target.getAttribute('data-product');
                const quantity = parseInt(e.target.value);
                const item = cart.find(item => item.product === product);
                if (item) {
                    item.quantity = quantity;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        });

        checkoutBtn.onclick = function () {
            alert('お買い上げありがとうございます！');
            // ここで購入手続きの処理を実装
            cart = [];
            localStorage.removeItem('cart'); // ローカルストレージからカートを削除
            updateCart(); // カート表示を更新
            updateCartCount(); 
        }
    } 

    if (document.querySelector('.contact-form')) {
        const submitBtn = document.getElementById("contact-submit-button")
        submitBtn.onclick = function () {
            alert("/docs.html にアクセスすると作業手順書が確認できます。")
        }
    }

    // モーダル機能
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const modalProductDetail = document.getElementById("modal-product-detail");
    const modalProductReviews = document.getElementById("modal-product-reviews");


    function createLiElement(productId, i, review) {
        if(productId === "2" && i == 7) {
            // "docs" のリンクを追加
            const docsLi = document.createElement("li");
            docsLi.id = `review_${i}`

            // テキストノード "test" を作成して追加
            const textBeforeLink = document.createTextNode("レビュー☆5: GA/GTMのオフライン勉強会に参加した際に");
            docsLi.appendChild(textBeforeLink);

            // <a> 要素を作成して設定
            const docsLink = document.createElement("a");
            docsLink.href = "docs.html";
            docsLink.textContent = "こちら";

            // リンクをリストアイテムに追加
            docsLi.appendChild(docsLink);

            // テキストノード "test2" を作成して追加
            const textAfterLink = document.createTextNode("のドキュメントを見ながら作業したところスムーズに作業が進められました。");
            docsLi.appendChild(textAfterLink);
            return docsLi
        } else {
            const li = document.createElement("li");
            li.id = `review_${i}`
            li.textContent = review
            return li
        }

    }

    document.querySelectorAll(".openModalBtn").forEach(function (btn) {
        btn.onclick = function () {
            const productId = btn.getAttribute("data-product-id");
            const productDetail = productDetails[productId];
        

        modalProductDetail.innerText = productDetail.detail;
        modalProductReviews.innerHTML = "";
        productDetail.reviews.forEach(function (review, i) {
            const li = createLiElement(productId, i, review)
            modalProductReviews.appendChild(li);
        });

        modal.style.display = "block";
        };
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
});
