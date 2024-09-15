function addDescendantCounts() {
    // Select all <li> elements in the document
    const listItems = document.querySelectorAll('li');
  
    // Function to count all descendant <li> elements
    function countDescendants(li) {
      return li.querySelectorAll('li').length;
    }
  
    // Loop through each <li> element in reverse order (to handle deeper lists first)
    Array.from(listItems).reverse().forEach(li => {
      // Count the number of descendant <li> elements
      const descendantCount = countDescendants(li);
  
      // Only append the count if there are descendants
      if (descendantCount > 0) {
        // Get the current text content of the <li>
        const currentText = li.firstChild.nodeValue.trim();
  
        // Append the count wrapped in parentheses to the text node
        li.firstChild.nodeValue = `${currentText} (${descendantCount})`;
      }
    });
  }


  
  