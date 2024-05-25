let count = 1;

function addRow() {
    count++;
    let table = document.getElementById('activities');
    let row = table.insertRow();

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = `Activity ${count}`;
    cell2.innerHTML = `A${count}`;
    cell3.innerHTML = `<input type="number" class="weight">`;
    cell4.innerHTML = `<input type="number" class="obtained"> / <input type="number" class="total">`;
    cell5.innerHTML = `<span class="percent"></span>`;

    addInputListeners(row);
}

function addInputListeners(row) {
    const obtainedInput = row.querySelector('.obtained');
    const totalInput = row.querySelector('.total');
    const percentCell = row.querySelector('.percent');

    const calculatePercent = () => {
        const obtained = parseFloat(obtainedInput.value);
        const total = parseFloat(totalInput.value);

        if (!isNaN(obtained) && !isNaN(total) && total > 0) {
            const percent = (obtained / total) * 100;
            percentCell.textContent = percent.toFixed(2);
        } else {
            percentCell.textContent = '';
        }
    };

    obtainedInput.addEventListener('input', calculatePercent);
    totalInput.addEventListener('input', calculatePercent);
}

function calculateResult(type) {
    let result = document.getElementById('resultContent');
    const rows = document.querySelectorAll('#activities tr');
    let res = 0.0;
    let validRowCount = 0;
    let totalRowCount = 0;
    let error = false;

    if (type === 'MEAN') {
        rows.forEach((row, index) => {
            if (index !== 0) { // Skip the header row
                const obtainedInput = row.querySelector('.obtained');
                const totalInput = row.querySelector('.total');

                if (obtainedInput && totalInput) {
                    const obtained = parseFloat(obtainedInput.value);
                    const total = parseFloat(totalInput.value);

                    if (!isNaN(obtained) && !isNaN(total) && total > 0) {
                        res += obtained / total;
                        validRowCount++;
                    }
                }
                totalRowCount++; // Count all potential rows
            }
        });

        if (validRowCount > 0) {
            res /= validRowCount;
            result.innerHTML = 'Mean calculated grade = ' + res.toFixed(2);
            if (validRowCount < totalRowCount) {
                result.innerHTML += '<br/>Note: Mean calculated only for rows with valid inputs. To get full results, complete all rows.';
            }
        } else {
            result.innerHTML = 'Error: Please fill in all obtained and total fields correctly to calculate the mean.';
        }
    } else { // WEIGHTED calculation
        let totalWeight = 0.0;
        let totalWeightCount = 0;

        rows.forEach((row, index) => {
            if (index !== 0) { // Skip the header row
                const weightInput = row.querySelector('.weight');
                const obtainedInput = row.querySelector('.obtained');
                const totalInput = row.querySelector('.total');

                if (weightInput && obtainedInput && totalInput) {
                    const weight = parseFloat(weightInput.value);
                    const obtained = parseFloat(obtainedInput.value);
                    const total = parseFloat(totalInput.value);

                    if (!isNaN(weight) && weight > 0 && !isNaN(obtained) && !isNaN(total) && total > 0) {
                        res += (obtained / total) * weight;
                        totalWeight += weight;
                        totalWeightCount++;
                    }
                }
            }
        });

        if (totalWeight > 0) {
            res /= totalWeight;
            result.innerHTML = 'Weighted average calculated grade = ' + res.toFixed(3);
            if (totalWeightCount < rows.length - 1) {
                result.innerHTML += '<br/>Note: Weighted mean calculated for only those boxes whose weight is written. To get the full information, enter all boxes.';
            }
        } else {
            result.innerHTML = 'Error: Please fill at least one weight and its corresponding grades to calculate the weighted average.';
        }
    }

    if (error && !result.innerHTML) {
        result.innerHTML = 'Error: Invalid or incomplete input.';
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('#activities tr');
    rows.forEach((row, index) => {
        if (index !== 0) { // Skip the header row
            addInputListeners(row);
        }
    });
});