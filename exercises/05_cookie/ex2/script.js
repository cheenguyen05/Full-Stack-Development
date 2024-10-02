function setCookies() {
  // TODO: Get form values. getElementById() might be useful here.
  const text1_value = document.getElementById("text1").value;
  const text2_value = document.getElementById("text2").value;
  const checkbox = document.getElementById("checkbox").checked;
  // TODO: Set cookie for each form value.
  document.cookie = 'text1=${text1_value}; path=/';
  document.cookie = 'text2=${text2_value}; path=/';
  document.cookie = 'checkbox=${checkbox}; path=/';
}


