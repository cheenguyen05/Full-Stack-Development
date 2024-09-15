function addDescendantCounts() {
    // Select all <li> elements in the document
    const listItems = document.querySelectorAll('li');
  
    // Loop through each <li> element
    listItems.forEach(li => {
      // Find all descendant <li> elements for the current <li>
      const descendants = li.querySelectorAll('li');
      
      // If there are descendants, append the count to the <li>'s text
      if (descendants.length > 0) {
        li.textContent += ` (${descendants.length})`;
      }
    });
  }
  
  // Run the function
  addDescendantCounts();
  