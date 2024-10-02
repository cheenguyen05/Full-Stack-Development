// TODO: Copy the setCookies function from the previous exercise
function setCookies() {
  // TODO: Get form values. getElementById() might be useful here.
  const text1_value = document.getElementById("text1").value;
  const text2_value = document.getElementById("text2").value;
  const checkbox = document.getElementById("checkbox").checked;
  // TODO: Set cookie for each form value.
  document.cookie = `text1=${text1_value}; path=/`;
  document.cookie = `text2=${text2_value}; path=/`;
  document.cookie = `checkbox=${checkbox}; path=/`;

}


// TODO: Implement the getCookie function. It should take a cookie name as an argument and return the cookie value.
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null; // Return null if cookie is not found
        

}


// DO NOT MODIFY BELOW THIS LINE
document.getElementById('submitButton').addEventListener('click', function() {
  setCookies();
  displayCookies();
});

function displayCookies() {
  document.getElementById('text1Cookie').textContent = "Text1: " + getCookie('text1');
  document.getElementById('text2Cookie').textContent = "Text2: " + getCookie('text2');
  document.getElementById('checkboxCookie').textContent = "Checkbox: " + getCookie('checkbox');
}