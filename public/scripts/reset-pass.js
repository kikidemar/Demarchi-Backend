const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('token');
document.getElementById('token').value = token

document.getElementById('user').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const token = document.getElementById('token').value; 

  
  if (newPassword !== confirmPassword) {
    errorElement.textContent = "Passwords do not match";
    return;
  }

  try {
    const response = await fetch('/api/auth/reset-pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    });
  } catch (error) {
    console.log ("An error occurred. Please try again later.")
  }
});