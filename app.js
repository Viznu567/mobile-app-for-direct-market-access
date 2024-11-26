document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const produceList = document.getElementById("produce-list");

    // Fetch produce data from the server
    async function fetchProduce() {
        const response = await fetch("/api/produce");
        const produce = await response.json();
        produceList.innerHTML = produce
            .map(item => `<li>${item.name} - ${item.produce} (${item.price}/unit, ${item.quantity} units)</li>`)
            .join("");
    }

    // Submit form data to the server
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            name: form.name.value,
            produce: form.produce.value,
            price: form.price.value,
            quantity: form.quantity.value
        };

        await fetch("/api/produce", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        form.reset();
        fetchProduce();
    });

    // Initial fetch of produce data
    fetchProduce();
});
