document.addEventListener("DOMContentLoaded", main);

function main() {
  const btnDelete = document.querySelectorAll("button.btn");

  btnDelete.forEach((btn) => {
    btn.addEventListener("click", deleteProduct);
  });

  async function deleteProduct() {
    const productId = this.parentNode.querySelector('[name="id"]').value;
    const csrf = this.parentNode.querySelector('[name="_csrf"]').value;
    const cardProduct = this.closest("article");

    const setting = {
      method: "delete",
      headers: {
        "csrf-token": csrf,
      },
    };

    try {
      const proses = await fetch(`/admin/product/${productId}`, setting);
      const result = await proses.json();
      cardProduct.parentNode.removeChild(cardProduct);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}
