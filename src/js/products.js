const BASE_URL = "https://ceramic-api.onrender.com";


function toCurrencySymbol(code) {
    const map = {
        EUR: "€",
        USD: "$",
        GBP: "£"
    };
    return map[code] ?? code;
}


async function loadProducts(category = "") {
    let url = `${BASE_URL}/api/products`;

    if (category) {
        url += `?category=${encodeURIComponent(category)}`;
    }

    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    return res.json();
}

const container = document.querySelector(".catalog-feed-container");



function renderProducts(products) {
    if (!container) return;
    container.innerHTML = "";

    products.forEach((item) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="catalog-feed-element">

                <img src="${BASE_URL}${item.image}" 
                     alt="${item.title}" 
                     class="catalog-feed-element-im" />

                <p class="catalog-feed-element-text">${item.title}</p>

                <p class="catalog-feed-element-text">
                    ${item.price} ${toCurrencySymbol(item.currency)}
                </p>

            </div>
        `
        );
    });
}
function initFilters() {
    const buttons = document.querySelectorAll(".filters-filter-item");

    buttons.forEach((btn) => {
        btn.addEventListener("click", async () => {
            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.textContent.trim();

            try {
                const products = await loadProducts(category);
                renderProducts(products);
            } catch (err) {
                console.error("Ошибка фильтрации:", err);
            }
        });
    });
}
async function initProducts() {
    try {
        const products = await loadProducts();
        renderProducts(products);

        initFilters();
    } catch (err) {
        console.error("Ошибка загрузки данных:", err);
    }
}



initProducts();
