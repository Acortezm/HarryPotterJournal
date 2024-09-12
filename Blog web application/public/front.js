document.getElementById("delete-btn").addEventListener("click", function() {
    // Get the entry value from the button's data attribute
    const entry = this.getAttribute("data-entry");

    // Send the entry value to the backend
    fetch("/delete-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ entry })
    })
    .then(response => response.text())
    .then(data => {
        // Check if the response indicates success
        if (data === "success") {
            window.location.reload(); // Refresh the page
        } else {
            alert("An error occurred: " + data);
        }
    })    
    .catch(error => console.error("Error:", error));
  });

