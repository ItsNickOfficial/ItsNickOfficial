
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quick-contact-form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.getElementById("quick-form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity() || submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.textContent = "Αποστολή...";
    submitButton.setAttribute("aria-busy", "true");
    status.textContent = "";
    status.className = "contact-section__note";
    status.setAttribute("role", "status");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      status.textContent =
        "Το αίτημά σου στάλθηκε επιτυχώς! Θα επικοινωνήσουμε σύντομα μαζί σου.";

      status.classList.add("is-success");
      form.reset();

    } catch (error) {
      console.error("Contact form error:", error);

      status.textContent =
        "Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά σε λίγο.";

      status.classList.add("is-error");

      status.setAttribute("role", "alert");

    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
      submitButton.innerHTML =
        'Αποστολή αιτήματος <span aria-hidden="true">↗</span>';
    }
  });
});
