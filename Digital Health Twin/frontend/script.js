document.getElementById("healthForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Collect input values
  const ph = document.getElementById("ph").value;
  const turbidity = document.getElementById("turbidity").value;
  const tds = document.getElementById("tds").value;
  const people = document.getElementById("people_affected_per_5000").value;

  try {
    const response = await fetch("http://127.0.0.1:5001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ph: ph,
        turbidity: turbidity,
        tds: tds,
        people_affected_per_5000: people
      })
    });

    const result = await response.json();

    // Show results
    const resultBox = document.getElementById("resultBox");
    document.getElementById("predictedDisease").innerText = "Predicted Disease: " + result.predicted_disease;
    document.getElementById("healthAlert").innerText = "Health Alert: " + result.health_alert;
    resultBox.classList.remove("hidden");

  } catch (err) {
    alert("Error connecting to backend: " + err);
  }
});
