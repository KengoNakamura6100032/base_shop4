document.addEventListener('DOMContentLoaded', function () {
    // カート機能
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
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
                const item = cart.find(item => item.product === product);
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
            const totalAmount = 0;
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

    // モーダル機能
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const modalProductDetail = document.getElementById("modal-product-detail");
    const modalProductReviews = document.getElementById("modal-product-reviews");

    const productDetails = {
        1: {
            detail: "これは「森川です」の商品詳細です。\n\n\n BASE初代MVPである守川さんの名前を森川や杜川などと間違える事案が多発したことで作成されたスタンプである。\n\n急いでいると間違えてしまうことがあるため、この問題は解決されることはないであろう。\n\nまた、最近では意図的に守川以外の漢字に変換する者もおり、もはや一文字もカスっていないという状況にエスカレートしていることも。\n\n出品者コメント\n 最近MVPを取得されたことで、今後価格が高騰することが見込まれますので、今が買い時です。\n※購入後すぐに利用可能\n※転売はお断り願います",
            reviews: ["レビュー1: 良い商品です。", "レビュー2: まあまあです。", "レビュー3: 良い商品です。", "レビュー4: まあまあです。"]
        },
        2: {
            detail: "これは「来れますか？服部」の商品詳細です。",
            reviews: ["レビュー1: とても良い商品です。", "レビュー2: 最高です。"]
        }
    };

    document.querySelectorAll(".openModalBtn").forEach(function (btn) {
        btn.onclick = function () {
            const productId = btn.getAttribute("data-product-id");
            const productDetail = productDetails[productId];

            modalProductDetail.innerText = productDetail.detail;
            modalProductReviews.innerHTML = "";
            productDetail.reviews.forEach(function (review, i) {
                const li = document.createElement("li");
                li.id = `review_${i}`
                li.textContent = review;
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
