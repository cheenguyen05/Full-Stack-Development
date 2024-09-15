/**
 * Sort table rows alphabetically based on the values in a column
 *
 * @param {Number} col column index (zero based)
 * @param {HTMLTableElement} table the table to be sorted
 */
function sortTableByColumn(col, table) {
  // TODO: Implement this function as instructed
  // Select the tbody and all rows inside it
  const tbody = table.querySelector('tbody');
  const rowsArray = Array.from(tbody.rows);

  // Sort the rows based on the text content in the specified column
  const sortedRows = rowsArray.sort((rowA, rowB) => {
    const cellA = rowA.cells[col].textContent.trim().toLowerCase();
    const cellB = rowB.cells[col].textContent.trim().toLowerCase();
    
    return cellA.localeCompare(cellB);
  });

  // Append the sorted rows back to the tbody (this will reorder them)
  sortedRows.forEach(row => tbody.appendChild(row));
}

/**
 * DO NOT EDIT THE CODE BELOW!
 *
 * The code below is there just to make it easier to test the code.
 *
 * If your function works correctly you should be able to sort the table
 * simply by clicking any column heading and the table should be immediately
 * sorted by values in that column.
 */

// find the table element
const table = document.getElementById('sortable');

// attach an event listener to each th element's click event
table.querySelectorAll('thead th').forEach((th, i) =>
  th.addEventListener('click', () => {
    sortTableByColumn(i, table);
  })
);