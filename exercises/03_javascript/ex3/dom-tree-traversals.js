function addDescendantCounts() {
    // Select all <li> elements in the document
    const listItems = document.querySelectorAll('li');
  
    // Loop through each <li> element
    listItems.forEach(li => {
      // Find all descendant <li> elements for the current <li>
      const descendants = li.querySelectorAll('li');
      
      // If there are descendants, append the count to the <li>'s text
      if (descendants.length > 0) {
        // Get current text content of the <li>
        const currentText = li.childNodes[0].nodeValue.trim();
  
        // Append the count wrapped in parentheses
        li.childNodes[0].nodeValue = `${currentText} (${descendants.length})`;
      }
    });
  }

  
  