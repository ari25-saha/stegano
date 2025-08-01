// Simulated embed function
function embedMessage(file, message, password) {
  return new Blob([message + "::" + password], { type: file.type });
}

// Simulated extract function
function extractMessage(file, password, callback) {
  const reader = new FileReader();
  reader.onload = function () {
    const content = reader.result;
    const [msg, pass] = content.split("::");
    if (pass === password) {
      callback(msg);
    } else {
      callback("Incorrect password.");
    }
  };
  reader.readAsText(file);
}

document.getElementById("embedButton").addEventListener("click", () => {
  const file = document.getElementById("fileInput").files[0];
  const message = document.getElementById("messageInput").value;
  const password = document.getElementById("passwordInput").value;

  if (!file || !message || password.length !== 4) {
    alert("Please select a file, write a message, and enter a 4-digit password.");
    return;
  }

  const embeddedFile = embedMessage(file, message, password);
  const url = URL.createObjectURL(embeddedFile);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "embedded_" + file.name;
  downloadLink.textContent = "Download Embedded File";
  downloadLink.className = "block mt-4 bg-blue-500 text-white py-2 px-4 rounded mx-auto";
  document.body.appendChild(downloadLink);
});

document.getElementById("extractButton").addEventListener("click", () => {
  const file = document.getElementById("fileInput").files[0];
  const password = document.getElementById("extractPasswordInput").value;

  if (!file || password.length !== 4) {
    alert("Please select a file and enter a 4-digit password.");
    return;
  }

  extractMessage(file, password, (msg) => {
    document.getElementById("extractedMessage").value = msg;
  });
});

document.getElementById("bruteForceButton").addEventListener("click", () => {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please select a file to brute-force.");
    return;
  }

  // Simulate redirect to brute-force page
  window.location.href = "brute-force.html"; // You can create this page separately
  

});
