const BASE_URL = "https://ceramic-api.onrender.com";

async function loadPosts() {
    const url = `${BASE_URL}/api/posts`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Ошибка загрузки постов: ${res.status}`);
    }

    return res.json();
}


function renderPosts(posts) {
    const container = document.querySelector(".blog_feedContainer");
    if (!container) return;

    container.innerHTML = "";

    posts.forEach((item) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="blog_feed__element">
                <div class="blog_feed__element__header">

                    <img src="${BASE_URL}${item.image}" 
                         alt="${item.title}" 
                         class="blog_feed__element__headerIm" />

                    <div class="blog_feed__element__headerTitle_block">
                        <h2 class="title-h2 blog_feed__element__headerTitle_blockTitle">
                          ${item.title}
                        </h2>

                        <button class="default-button blog_feed__element__headerTitle_block__button" 
                                data-post-id="${item.id}">
                          read
                        </button>
                    </div>

                </div>

                <p class="paragraph blog_feed__elementText">
                    ${item.excerpt ?? ""}
                </p>
            </div>
        `
        );
    });
}

async function initBlog() {
    try {
        const posts = await loadPosts();
        renderPosts(posts);
    } catch (err) {
        console.error("Ошибка загрузки постов:", err);
    }
}

initBlog();
