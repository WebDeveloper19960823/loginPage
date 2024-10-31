const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signupButton = document.querySelector(".signup");
const signinButton = document.querySelector(".signin");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}

signupButton.addEventListener("click", async () => {
    const username = document.querySelector(".name").value;
    const password = document.querySelector(".password").value;
    const email = document.querySelector(".email").value;

    if (username === "" || password === "" || email === "") {
        alert("لطفاً تمام فیلدها را پر کنید.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
        (user) => user.email === email || user.username === username
    );

    if (existingUser) {
        alert("نام کاربری یا ایمیل قبلاً ثبت شده است.");
        return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("ثبت‌نام با موفقیت انجام شد!");

    container.classList.remove("right-panel-active");
});

signinButton.addEventListener("click", async () => {
    const email = document.querySelector(".signin-email").value;
    const password = document.querySelector(".signin-password").value;

    if (email === "" || password === "") {
        alert("لطفاً تمام فیلدها را پر کنید.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const hashedPassword = await hashPassword(password);

    const existingUser = users.find(
        (user) => user.email === email && user.password === hashedPassword
    );

    if (existingUser) {
        alert("ورود موفقیت‌آمیز بود!");
    } else {
        alert("ایمیل یا رمز عبور نادرست است.");
    }
});

let guide = document.querySelector(".guide");
guide.addEventListener("click", () => {
    alert("ریدی بیشتر به کار های نکرده ات فکر کن");
});
