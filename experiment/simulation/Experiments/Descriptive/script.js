//javascript file for descriptive statistics experiments



function createSampleInputs() {
    const numSamples = parseInt(document.getElementById('numSamples').value);
    const sampleInputContainer = document.getElementById('sampleInputContainer');
    const sampleSelectionContainer = document.getElementById('sampleSelectionContainer');

    sampleInputContainer.innerHTML = '';
    sampleSelectionContainer.innerHTML = '';

    for (let i = 1; i <= numSamples; i++) {
        const label = document.createElement('label');
        label.htmlFor = `Sample_${i}`;
        label.textContent = `Sample ${i}: `;

        const input = document.createElement('input');
        input.type = 'text'; // Change the input type to 'text'
        input.id = `Sample_${i}`;
        input.name = `Sample_${i}`;
        input.placeholder = `Enter values for Sample ${i} with space in between`;
        input.classList.add('sample-input');

        sampleInputContainer.appendChild(label);
        sampleInputContainer.appendChild(input);
        sampleInputContainer.appendChild(document.createElement('br'));

        // Create checkbox for sample selection
        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = `Checkbox_${i}`;
        checkboxLabel.textContent = `Sample ${i} `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `Checkbox_${i}`;
        checkbox.name = `Checkbox_${i}`;
        checkbox.value = `Sample_${i}`;

        sampleSelectionContainer.appendChild(checkboxLabel);
        sampleSelectionContainer.appendChild(checkbox);
        sampleSelectionContainer.appendChild(document.createElement('br'));
    }

    document.getElementById("regressionButton").style.display = numSamples >= 2 ? "block" : "none";

    // Function to get the data from the input fields
}

function getData() {
    const numSamples = parseInt(document.getElementById('numSamples').value);
    const data2DArray = [];

    for (let i = 1; i <= numSamples; i++) {
        const inputId = `Sample_${i}`;
        let dataString = document.getElementById(inputId).value.trim();
        dataString = dataString.replace(/\s+/g, " ");

        const dataArray = dataString.split(/\s+/).map(Number);
        data2DArray.push(dataArray);
    }

    console.log(data2DArray);
    return data2DArray;
}

// function getData() {
//     // extacting data points into an array from the string of Sample_1

//     // extacting data points into an array from the string of Sample_1
//     let dataString = document.getElementById("Sample_1").value;
//     let freqString = document.getElementById("Sample_2").value;

//     // removing extra space char at the bigginnig and end of inputed data
//     dataString = dataString.trim();
//     freqString = freqString.trim();

//     // removing extra space in-between the data values in the data strings
//     dataString = dataString.replace(/\s+/g, " ");
//     freqString = freqString.replace(/\s+/g, " ");

//     // defining a test to check whether the data in class data or not
//     let classtest = /\d+[-]\d+/;

//     // testing data string for classinput
//     //if is is class data data we will return classdatafreq array if not we will return normal freqdataAray
//     if (classtest.test(dataString)) {
//         let dataArrayString = "";
//         dataArrayString = dataString.split(" ");
//         console.log(dataArrayString);
//     }

//     // making an num array from the string of point data
//     let dataArray = dataString.split(" ");
//     for (let x = 0; x < dataArray.length; x++) {
//         dataArray[x] = +dataArray[x];
//     }

//     // making an num array from the string of freq data
//     let freqArray = freqString.split(" ");
//     for (let x = 0; x < freqArray.length; x++) {
//         freqArray[x] = +freqArray[x];
//     }

//     let freqDataArray = [];

//     if (freqArray.length !== dataArray.length) {
//         alert("number of data and freqencies don't match");
//     } else {
//         freqDataArray.push(dataArray);
//         freqDataArray.push(freqArray);
//     }
//     console.log(freqDataArray);
//     return freqDataArray;
// }


// // function getFlatData() {
// //     // extacting data points into an array from the string of Sample_1

// //     // extacting data points into an array from the string of Sample_1
// //     let dataString = document.getElementById("Sample_1").value;
// //     let freqString = document.getElementById("Sample_2").value;

// //     // removing extra space char at the bigginnig and end of inputed data
// //     dataString = dataString.trim();
// //     freqString = freqString.trim();

// //     // removing extra space in-between the data values in the data strings
// //     dataString = dataString.replace(/\s+/g, " ");
// //     freqString = freqString.replace(/\s+/g, " ");

// //     // defining a test to check whether the data in class data or not
// //     let classtest = /\d+[-]\d+/;

// //     // testing data string for classinput
// //     //if is is class data data we will return classdatafreq array if not we will return normal freqdataAray
// //     if (classtest.test(dataString)) {
// //         let dataArrayString = "";
// //         dataArrayString = dataString.split(" ");
// //         console.log(dataArrayString);
// //     }

// //     // making an num array from the string of point data
// //     let dataArray = dataString.split(" ");
// //     for (let x = 0; x < dataArray.length; x++) {
// //         dataArray[x] = +dataArray[x];
// //     }

// //     // making an num array from the string of freq data
// //     let freqArray = freqString.split(" ");
// //     for (let x = 0; x < freqArray.length; x++) {
// //         freqArray[x] = +freqArray[x];
// //     }

// //     let freqDataArray = [];

// //     if (freqArray.length !== dataArray.length) {
// //         alert("number of data and freqencies don't match");
// //     } else {

// //         for (let k = 0; k < dataArray.length; k++) {
// //             let tempArray = []
// //             for (let i = freqArray[k]; i > 0; i--) {
// //                 tempArray.push(dataArray[k]);
// //             }
// //             // tempArray.push(freqArray[k]);
// //             freqDataArray.push(tempArray);
// //         }
// //     }

// //     freqDataArray = freqDataArray.flat();
// //     // console.log(freqDataArray)
// //     return freqDataArray;
// // }

//---------------------------------------------------------------------
// Start of all Charting Functions
//---------------------------------------------------------------------

// Start of Line Chart Plot funtion


google.charts.load("current", { packages: ["corechart"] });

function makeLineChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 2) {
        alert("Please select exactly two samples for plotting.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    let data = new google.visualization.DataTable();
    mydata.forEach(sample => {
        data.addColumn("number", sample.label);
    });

    let rows = [];
    const numRows = Math.min(...mydata.map(sample => sample.values.length));

    for (let i = 0; i < numRows; i++) {
        let tempArray = mydata.map(sample => sample.values[i]);
        rows.push(tempArray);
    }

    data.addRows(rows);

    // Set options
    var options = {
        title: "Line Chart",
        hAxis: { title: mydata[0].label },
        vAxis: { title: mydata[1].label },
        legend: "both",
        series: mydata.map((sample, index) => ({ color: index === 0 ? "#e2431e" : "#4374e0", labelInLegend: sample.label }))
    };

    // Draw Chart
    var chart = new google.visualization.LineChart(
        document.getElementById("myChart")
    );
    chart.draw(data, options);
}
// End of Line Chart Plot funtion


//---------------------------------------------------------------------
// Start of scatter chart plot function
function makeScatterChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 2) {
        alert("Please select exactly two samples for plotting.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    let data = new google.visualization.DataTable();
    data.addColumn("number", mydata[0].label);
    data.addColumn("number", mydata[1].label);

    let rows = [];
    const numRows = Math.min(...mydata.map(sample => sample.values.length));

    for (let i = 0; i < numRows; i++) {
        let tempArray = mydata.map(sample => sample.values[i]);
        rows.push(tempArray);
    }

    data.addRows(rows);

    // Set options
    var options = {
        title: "Scatter Plot",
        hAxis: { title: mydata[0].label },
        vAxis: { title: mydata[1].label },
        legend: "none",
        pointSize: 5,
        series: {
            0: { color: "#e2431e" }
        }
    };

    // Draw Chart
    var chart = new google.visualization.ScatterChart(
        document.getElementById("myChart")
    );
    chart.draw(data, options);
}



// End of Scatter Chart graph plot function
//--------------------------------------------------------------------










// Start of Area chart plot function
function makeAreaChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 2) {
        alert("Please select exactly two samples for plotting.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    let data = new google.visualization.DataTable();
    data.addColumn("number", mydata[0].label);
    data.addColumn("number", mydata[1].label);

    let rows = [];
    const numRows = Math.min(...mydata.map(sample => sample.values.length));

    for (let i = 0; i < numRows; i++) {
        let tempArray = mydata.map(sample => sample.values[i]);
        rows.push(tempArray);
    }

    data.addRows(rows);

    // Set options
    var options = {
        title: "Area Graph",
        hAxis: { title: mydata[0].label },
        vAxis: { title: mydata[1].label },
        legend: "none",
        series: {
            0: { color: "#e2431e" }
        }
    };

    // Draw Chart
    var chart = new google.visualization.AreaChart(
        document.getElementById("myChart")
    );
    chart.draw(data, options);
}


// End of Scatter Chart graph plot function
//--------------------------------------------------------------------






//--------------------------------------------------------------------

// Start of Table plot code
google.charts.load("current", { packages: ["table"] });
// Start of Table plot function
function makeTableChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 2) {
        alert("Please select exactly two samples for plotting.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return values;
    });

    let data = new google.visualization.DataTable();
    data.addColumn("number", sampleIds[0]);
    data.addColumn("number", sampleIds[1]);

    let rows = [];
    const numRows = Math.min(...mydata.map(sample => sample.length));

    for (let i = 0; i < numRows; i++) {
        let tempArray = mydata.map(sample => sample[i]);
        rows.push(tempArray);
    }

    data.addRows(rows);

    // Set Options
    let options = {
        title: "Data Table",
        showRowNumber: true,
        alternatingRowStyle: true,
        explorer: { axis: "horizontal", keepInBounds: true },
    };

    // Draw Chart
    var chart = new google.visualization.Table(
        document.getElementById("myChart")
    );
    chart.draw(data, options);
}


// End of Table Chart graph plot function
//--------------------------------------------------------------------

//---------------------------------------------------------------------
// End of all Charting Functions
//---------------------------------------------------------------------


// Function to calculate the confidence interval for a given dataset and confidence level
//part1/////////////////
///////////////////////////
////////////////////////////
///////////////////////////////
// Function to calculate the confidence interval for the mean

function NormSInv(p) {
    var a1 = -39.6968302866538,
        a2 = 220.946098424521,
        a3 = -275.928510446969;
    var a4 = 138.357751867269,
        a5 = -30.6647980661472,
        a6 = 2.50662827745924;
    var b1 = -54.4760987982241,
        b2 = 161.585836858041,
        b3 = -155.698979859887;
    var b4 = 66.8013118877197,
        b5 = -13.2806815528857,
        c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136,
        c3 = -2.40075827716184,
        c4 = -2.54973253934373;
    var c5 = 4.37466414146497,
        c6 = 2.93816398269878,
        d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004,
        d3 = 2.445134137143,
        d4 = 3.75440866190742;
    var p_low = 0.02425,
        p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1)) {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    } else if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
}


function calculateConfidenceIntervalForMean(data, confidenceLevel) {
    const n = data.length;
    const degreesOfFreedom = n - 1;
    const sampleMean = data.reduce((sum, item) => sum + item, 0) / n;
    const sampleStandardDeviation = calculateStandardDeviation(data);
    const zValue = jStat.studentt.inv((1 - confidenceLevel) / 2, degreesOfFreedom);

    const marginOfError = zValue * (sampleStandardDeviation / Math.sqrt(n));
    const lowerBound = sampleMean - marginOfError;
    const upperBound = sampleMean + marginOfError;

    return [upperBound, lowerBound];
}

// Function to calculate the standard deviation
function calculateStandardDeviation(data) {
    const n = data.length;
    const mean = data.reduce((sum, item) => sum + item, 0) / n;
    const squaredDifferences = data.map(item => Math.pow(item - mean, 2));
    const sumOfSquaredDifferences = squaredDifferences.reduce((sum, item) => sum + item, 0);
    const variance = sumOfSquaredDifferences / (n - 1);
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}

// Modified code to calculate confidence intervals and display the result
function calculateInterval() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    const confidenceLevelInput = document.getElementById('confidenceLevel');
    const confidenceLevel = parseFloat(confidenceLevelInput.value) / 100; // Convert percentage to decimal

    // Check if the input is a valid number between 0 and 100
    if (isNaN(confidenceLevel) || confidenceLevel < 0 || confidenceLevel > 100) {
        alert("Please enter a valid confidence level between 0 and 100.");
        return;
    }

    // Calculate confidence interval for the mean of each sample
    const confidenceIntervals = mydata.map(sample => {
        const data = sample.values;
        const [lowerBound, upperBound] = calculateConfidenceIntervalForMean(data, confidenceLevel);
        return {
            label: sample.label,
            confidenceInterval: [lowerBound, upperBound]
        };
    });

    // Display confidence intervals in the HTML element
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results
    confidenceIntervals.forEach(interval => {
        const label = interval.label;
        var lowerBound = interval.confidenceInterval[0];
        var upperBound = interval.confidenceInterval[1];

        const intervalText = `${(confidenceLevel*100).toFixed(2)}% Confidence Interval for the mean of ${label}: [${lowerBound.toFixed(2)}, ${upperBound.toFixed(2)}]`;
        const intervalElement = document.createElement('p');
        intervalElement.textContent = intervalText;
        resultArea.appendChild(intervalElement);
        createMeanWithIntervalPlot(mydata[0].values, lowerBound, upperBound);

    });




}


// Function to calculate the confidence interval for the variance of a given dataset and confidence level
function calculateConfidenceIntervalForVariance(data, confidenceLevel) {
    const n = data.length;
    const degreesOfFreedom = n - 1;
    const sampleVariance = calculateVariance(data);
    const alpha = 1 - confidenceLevel;
    const chiSquaredLower = jStat.chisquare.inv(1 - alpha / 2, degreesOfFreedom);
    const chiSquaredUpper = jStat.chisquare.inv((alpha / 2), degreesOfFreedom);
    console.log(`Chi Squared Lower is  ${chiSquaredLower}`);
    console.log(`Chi Squared Upper is  ${chiSquaredUpper}`);
    const lowerBound = (degreesOfFreedom * sampleVariance) / chiSquaredLower;
    const upperBound = (degreesOfFreedom * sampleVariance) / chiSquaredUpper;

    return [lowerBound, upperBound];
}

// Function to calculate the sample variance
function calculateVariance(data) {
    const mean = data.reduce((sum, item) => sum + item, 0) / data.length;
    const squaredDifferences = data.map(item => Math.pow(item - mean, 2));
    const variance = squaredDifferences.reduce((sum, item) => sum + item, 0) / (data.length - 1);
    console.log(`VAriace  is  ${variance}`);
    return variance;
}


// Modified code to calculate confidence intervals for variance and display the result
function calculateInterval2() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    const confidenceLevelInput = document.getElementById('confidenceLevel');
    const confidenceLevel = parseFloat(confidenceLevelInput.value) / 100; // Convert percentage to decimal

    // Check if the input is a valid number between 1 and 100
    if (isNaN(confidenceLevel) || confidenceLevel < 0 || confidenceLevel > 1) {
        alert("Please enter a valid confidence level between 1 and 100.");
        return;
    }

    // Calculate confidence interval for the variance of each sample
    const confidenceIntervals = mydata.map(sample => {
        const data = sample.values;
        const [lowerBound, upperBound] = calculateConfidenceIntervalForVariance(data, confidenceLevel);
        return {
            label: sample.label,
            confidenceInterval: [lowerBound, upperBound]
        };
    });

    // Display confidence intervals in the HTML element
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results
    confidenceIntervals.forEach(interval => {
        const label = interval.label;
        const lowerBound = interval.confidenceInterval[0];
        const upperBound = interval.confidenceInterval[1];
        // const sampleVariance = interval.confidenceInterval[2];
        // console.log(`sample variance : ${sampleVariance}`);
        const intervalText = `${(confidenceLevel*100).toFixed(2)}% confidence interval for Variance of ${label}: [${lowerBound.toFixed(2)}, ${upperBound.toFixed(2)}] }}`;
        const intervalElement = document.createElement('p');
        intervalElement.textContent = intervalText;
        resultArea.appendChild(intervalElement);
        createMeanWithIntervalPlot(mydata[0].values, lowerBound, upperBound);

    });



}


///part 3

// Function to calculate the confidence interval for the ratio of variances of two samples
function calculateConfidenceIntervalForRatioOfVariances(data1, data2, confidenceLevel) {
    const n1 = data1.length;
    const n2 = data2.length;
    const degreesOfFreedom1 = n1 - 1;
    const degreesOfFreedom2 = n2 - 1;
    const variance1 = calculateVariance(data1);
    const variance2 = calculateVariance(data2);
    const alpha = 1 - confidenceLevel;
    const fLower = jStat.centralF.inv(alpha / 2, degreesOfFreedom1, degreesOfFreedom2);
    const fUpper = jStat.centralF.inv(alpha / 2, degreesOfFreedom2, degreesOfFreedom1);

    const lowerBound = (variance1 / variance2) * (1 / fLower);
    const upperBound = (variance1 / variance2) * (fUpper);

    return [upperBound, lowerBound];
}


function calculateInterval3() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 2) {
        alert("Please select exactly two samples.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    const confidenceLevelInput = document.getElementById('confidenceLevel');
    const confidenceLevel = parseFloat(confidenceLevelInput.value) / 100; // Convert percentage to decimal

    // Check if the input is a valid number between 1 and 100
    if (isNaN(confidenceLevel) || confidenceLevel < 0 || confidenceLevel > 1) {
        alert("Please enter a valid confidence level between 1 and 100.");
        return;
    }

    // Calculate confidence interval for the ratio of variances of the two samples
    const sample1 = mydata[0].values;
    const sample2 = mydata[1].values;
    const [lowerBound, upperBound] = calculateConfidenceIntervalForRatioOfVariances(sample1, sample2, confidenceLevel);

    // Display confidence interval in the HTML element
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results

    const intervalText = `${(confidenceLevel * 100).toFixed(2)}% confidence interval for Ratio of Variances: [${lowerBound.toFixed(2)}, ${upperBound.toFixed(2)}]`;
    const intervalElement = document.createElement('p');
    intervalElement.textContent = intervalText;
    resultArea.appendChild(intervalElement);

    const graph = document.getElementById('plotDiv');
    graph.innerHTML = ''; // Clear previous results
}



function estimateNormalParameters(data) {
    var n = data.length;

    // Calculate the sample mean
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += data[i];
    }
    var sampleMean = sum / n;

    // Calculate the sample variance
    var squaredDifferencesSum = 0;
    for (var i = 0; i < n; i++) {
        var difference = data[i] - sampleMean;
        squaredDifferencesSum += difference * difference;
    }
    var sampleVariance = squaredDifferencesSum / n;

    // Return the estimated mean and variance
    return {
        mean: sampleMean,
        variance: sampleVariance
    };
}


function normal() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    // Estimate mean and variance
    var estimatedParameters = estimateNormalParameters(mydata[0].values);
    var estimatedMean = estimatedParameters.mean;
    var estimatedVariance = estimatedParameters.variance;

    // Display estimated mean and variance
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results

    var heading = document.createElement('p');
    heading.textContent = `Maximum Likelehood Estimator`;
    resultArea.appendChild(heading);

    var meanElement = document.createElement('p');
    meanElement.textContent = ` Mean: ${estimatedMean.toFixed(2)}`;
    resultArea.appendChild(meanElement);

    var varianceElement = document.createElement('p');
    varianceElement.textContent = ` Variance: ${estimatedVariance.toFixed(2)}`;
    resultArea.appendChild(varianceElement);

    heading = document.createElement('p');
    heading.textContent = `Method of Moments`;
    resultArea.appendChild(heading);

    meanElement = document.createElement('p');
    meanElement.textContent = ` Mean: ${estimatedMean.toFixed(2)}`;
    resultArea.appendChild(meanElement);

    varianceElement = document.createElement('p');
    varianceElement.textContent = ` Variance: ${estimatedVariance.toFixed(2)}`;
    resultArea.appendChild(varianceElement);

    createMeanWithVariancePlot(mydata[0].values);



}

function estimateExponentialParameter(data) {
    var n = data.length;

    // Calculate the reciprocal of the sample mean
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += data[i];
    }
    var reciprocalMean = n / sum;

    // Calculate the estimated parameter lambda


    return reciprocalMean;
}

function exp() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    // Estimate mean and variance
    const estimatedParameters = estimateExponentialParameter(mydata[0].values);

    // Display estimated mean and variance
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results

    var meanElement = document.createElement('p');
    meanElement.textContent = `Maximum Liklehood Estimator λ : ${estimatedParameters.toFixed(2)}`;
    resultArea.appendChild(meanElement);

    meanElement = document.createElement('p');
    meanElement.textContent = `Method of Moments λ : ${estimatedParameters.toFixed(2)}`;
    resultArea.appendChild(meanElement);

    createMeanWithVariancePlot(mydata[0].values);


}

function estimatePoissonParameter(data) {
    var n = data.length;

    // Calculate the sample mean
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += data[i];
    }
    var sampleMean = sum / n;

    // Return the estimated lambda
    return sampleMean;
}

function poisson() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    // Estimate lambda
    const estimatedLambda = estimatePoissonParameter(mydata[0].values);

    // Display estimated lambda
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results

    var lambdaElement = document.createElement('p');
    lambdaElement.textContent = `Maximum Liklehood Estimator λ: ${estimatedLambda.toFixed(2)}`;
    resultArea.appendChild(lambdaElement);

    lambdaElement = document.createElement('p');
    lambdaElement.textContent = `Mehtod of Moments λ: ${estimatedLambda.toFixed(2)}`;
    resultArea.appendChild(lambdaElement);

    createMeanWithVariancePlot(mydata[0].values);


}


function estimateGeometricParameter(data) {
    const n = data.length;

    // Calculate the sample mean
    const sum = data.reduce((total, value) => total + value, 0);
    const sampleMean = sum / n;

    // Estimate the success probability parameter
    const estimatedParameter = 1 / sampleMean;

    return estimatedParameter;
}

function geometric() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });


    // Estimate parameter for the geometric distribution
    const estimatedParameter = estimateGeometricParameter(mydata[0].values);

    // Display estimated parameter
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results

    var parameterElement = document.createElement('p');
    parameterElement.textContent = `Maximum Likelihood Estimator p: ${estimatedParameter.toFixed(2)}`;
    resultArea.appendChild(parameterElement);

    parameterElement = document.createElement('p');
    parameterElement.textContent = `Method of Moments p: ${estimatedParameter.toFixed(2)}`;
    resultArea.appendChild(parameterElement);

    createMeanWithVariancePlot(mydata[0].values);

}

function estimateGammaParametersMOM(data) {
    const n = data.length;

    // Calculate the sample mean and sample variance
    const sum = data.reduce((total, value) => total + value, 0);
    const sampleMean = sum / n;

    const sumSquared = data.reduce((total, value) => total + value ** 2, 0);
    const sampleVariance = (sumSquared / n) - (sampleMean ** 2);

    // Estimate the parameters shape (k) and scale (θ)
    const estimatedK = (sampleMean ** 2) / sampleVariance;
    const estimatedTheta = sampleVariance / sampleMean;

    return { k1: estimatedK, theta1: estimatedTheta };
}

function estimateGammaParametersMLE(data) {
    const n = data.length;

    // Calculate the sample mean and log of the sample mean
    const sum = data.reduce((total, value) => total + value, 0);
    const sampleMean = sum / n;
    const logSampleMean = Math.log(sampleMean);

    // Calculate the sample log likelihood
    const logLikelihood = data.reduce((total, value) => total + Math.log(value), 0);

    // Estimate the parameters shape (k) and scale (θ)
    const estimatedK = (3 - logSampleMean + Math.sqrt((logSampleMean - 3) ** 2 + 24 * logLikelihood)) / (12 * logSampleMean);
    const estimatedTheta = sampleMean / estimatedK;

    return { k: estimatedK, theta: estimatedTheta };
}


function gamma() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });


    // Estimate parameters for the gamma distribution
    var { k, theta } = estimateGammaParametersMLE(mydata[0].values);

    // Display estimated parameters
    const resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = ''; // Clear previous results

    var parameterElement = document.createElement('p');
    parameterElement.textContent = `Maximum Likelihood Estimator: k = ${k.toFixed(2)}, θ = ${theta.toFixed(2)}`;
    resultArea.appendChild(parameterElement);

    var { k1, theta1 } = estimateGammaParametersMOM(mydata[0].values);

    parameterElement = document.createElement('p');
    parameterElement.textContent = `Method of Moments: k = ${k1.toFixed(2)}, θ = ${theta1.toFixed(2)}`;
    resultArea.appendChild(parameterElement);

    createMeanWithVariancePlot(mydata[0].values);

}


function createMeanWithVariancePlot(data) {
    const mean = data.reduce((total, value) => total + value, 0) / data.length;
    const variance = data.reduce((total, value) => total + (value - mean) ** 2, 0) / data.length;

    const plotData = [{
            x: data,
            y: new Array(data.length).fill(mean),
            mode: 'lines',
            line: { color: 'blue' },
            name: 'Mean',
        },
        {
            x: data,
            y: new Array(data.length).fill(mean),
            error_y: {
                type: 'data',
                array: new Array(data.length).fill(Math.sqrt(variance)),
                visible: true,
                color: 'gray',
                thickness: 1,
                width: 3,
            },
            mode: 'markers',
            marker: {
                color: 'blue',
                size: 6,
            },
            name: 'Variance',
        },
    ];

    const layout = {
        title: 'Sample Mean with Variance Plot',
        width: 600, // Set the desired width in pixels
        height: 400, // Set the desired height in pixels
        xaxis: {
            title: 'X-axis',
        },
        yaxis: {
            title: 'Mean',
        },
    };


    Plotly.newPlot('plotDiv', plotData, layout);
}


function createMeanWithIntervalPlot(data, intervalStart, intervalEnd) {
    const mean = data.reduce((total, value) => total + value, 0) / data.length;
    const variance = data.reduce((total, value) => total + (value - mean) ** 2, 0) / data.length;

    const plotData = [{
            x: data,
            y: new Array(data.length).fill(mean),
            mode: 'lines',
            line: { color: 'blue' },
            name: 'Mean',
        },
        {
            x: data,
            y: new Array(data.length).fill(mean),
            error_y: {
                type: 'data',
                array: new Array(data.length).fill(Math.sqrt(variance)),
                visible: true,
                color: 'gray',
                thickness: 1,
                width: 3,
            },
            mode: 'markers',
            marker: {
                color: 'blue',
                size: 6,
            },
            name: 'Variance',
        },
    ];

    const layout = {
        title: 'Sample Mean with Variance Plot',
        width: 600, // Set the desired width in pixels
        height: 400, // Set the desired height in pixels
        xaxis: {
            title: 'X-axis',
        },
        yaxis: {
            title: 'Mean',
        },
        shapes: [{
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: intervalStart,
            x1: intervalEnd,
            y0: Math.min(...data),
            y1: Math.max(...data),
            fillcolor: 'rgba(0, 128, 0, 0.2)', // Set the desired fill color
            line: {
                width: 0,
            },
        }, ],
    };

    Plotly.newPlot('plotDiv', plotData, layout);
}


// JavaScript code
function hypothesisTest() {
    // Get the input values
    var n = parseInt(document.getElementById('n').value);
    var mean = parseFloat(document.getElementById('value').value);
    var sampleMean = parseFloat(document.getElementById('samplemean').value);
    var variance = parseFloat(document.getElementById('variance').value);
    var significanceLevel = parseFloat(document.getElementById('significanceLevel').value) / 100;

    // Calculate the standard deviation
    var standardDeviation = Math.sqrt(variance);

    // Calculate the standard error
    var standardError = standardDeviation / Math.sqrt(n);

    // Determine the operator selected for the null hypothesis
    var operatorSelect = document.getElementById('operator1');
    var operatorValue = operatorSelect.options[operatorSelect.selectedIndex].value;

    // Calculate the critical value (z-score) or (t-score) based on the significance level and operator selected
    var criticalValue1;
    var criticalValue2;
    if (operatorValue === "equal") {
        criticalValue1 = jStat.normal.inv(significanceLevel / 2, mean, standardDeviation);
        criticalValue2 = jStat.normal.inv(1 - significanceLevel / 2, mean, standardDeviation);
    } else if (operatorValue === "greater") {
        criticalValue1 = jStat.normal.inv(significanceLevel, mean, standardDeviation);
        criticalValue2 = Infinity;
    } else {
        criticalValue1 = -Infinity;
        criticalValue2 = jStat.normal.inv(1 - significanceLevel, mean, standardDeviation);
    }

    // Calculate the test statistic (z-score) or (t-score)
    var testStatistic = sampleMean;

    // Perform the hypothesis test and update the result
    var result;
    console.log(testStatistic, criticalValue1, criticalValue2);
    if (testStatistic < criticalValue1 || testStatistic > criticalValue2) {
        result = "Reject the null hypothesis";
    } else {
        result = "Fail to reject the null hypothesis";
    }

    if (criticalValue1 == -Infinity)
        criticalValue1 = mean - 4 * standardDeviation;
    if (criticalValue2 == Infinity)
        criticalValue2 = mean + 4 * standardDeviation;

    var canvas = document.getElementById('normal-distribution-canvas');
    var ctx = canvas.getContext('2d');

    // Define the canvas dimensions
    var canvasWidth = 600; // Increase the canvas width as desired
    var canvasHeight = 400; // Increase the canvas height as desired
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Define the mean and standard deviation of the normal distribution
    var distributionMean = mean;
    var distributionStandardDeviation = standardDeviation;

    // Define the x-axis range
    var xMin = distributionMean - 4 * distributionStandardDeviation;
    var xMax = distributionMean + 4 * distributionStandardDeviation;

    // Calculate the step size for drawing the curve
    var stepSize = (xMax - xMin) / canvasWidth;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the x-axis
    var xAxisY = canvasHeight / 2;
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvasWidth, xAxisY);
    ctx.stroke();

    // Draw the normal distribution curve
    ctx.beginPath();
    for (var x = xMin; x <= xMax; x += stepSize) {
        var y = (1 / (Math.sqrt(2 * Math.PI) * distributionStandardDeviation)) * Math.exp(-((x - distributionMean) ** 2) / (2 * (distributionStandardDeviation ** 2)));
        var yPixel = canvasHeight / 2 - (y * canvasHeight / 2);
        var xPixel = (x - xMin) * canvasWidth / (xMax - xMin);
        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();

    // Shade the valid region
    var validRegionStartPixel = (criticalValue1 - xMin) * canvasWidth / (xMax - xMin);
    var validRegionEndPixel = (criticalValue2 - xMin) * canvasWidth / (xMax - xMin);
    ctx.fillStyle = 'rgba(0, 128, 0, 0.2)';
    ctx.fillRect(validRegionStartPixel, 0, validRegionEndPixel - validRegionStartPixel, canvasHeight);

    // Draw a vertical line to represent the sample mean
    var sampleMeanPixel = (testStatistic - xMin) * canvasWidth / (xMax - xMin);
    ctx.beginPath();
    ctx.moveTo(sampleMeanPixel, 0);
    ctx.lineTo(sampleMeanPixel, canvasHeight);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Sample Mean: ' + testStatistic.toFixed(2), sampleMeanPixel + 10, canvasHeight / 3);

    // Mark the value of the start point
    ctx.fillText('Start: ' + criticalValue1.toFixed(2), validRegionStartPixel - 50, 20);

    // Mark the value of the end point
    ctx.fillText('End: ' + criticalValue2.toFixed(2), validRegionEndPixel + 10, 20);

    // Display the test result
    var resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = "<strong>Test Result: </strong>" + result;
}


function hypothesisTest3() {
    // Get the input values
    var n = parseInt(document.getElementById('n').value);
    var mean = parseFloat(document.getElementById('value').value);
    var sampleMean = parseFloat(document.getElementById('samplemean').value);
    var variance = sampleMean * (1 - sampleMean);
    var significanceLevel = parseFloat(document.getElementById('significanceLevel').value) / 100;

    // Calculate the standard deviation
    var standardDeviation = Math.sqrt(variance);

    // Calculate the standard error
    var standardError = standardDeviation / Math.sqrt(n);

    // Determine the operator selected for the null hypothesis
    var operatorSelect = document.getElementById('operator1');
    var operatorValue = operatorSelect.options[operatorSelect.selectedIndex].value;

    // Calculate the critical value (z-score) or (t-score) based on the significance level and operator selected
    var criticalValue1;
    var criticalValue2;
    if (operatorValue === "equal") {
        criticalValue1 = jStat.normal.inv(significanceLevel / 2, mean, standardDeviation);
        criticalValue2 = jStat.normal.inv(1 - significanceLevel / 2, mean, standardDeviation);
    } else if (operatorValue === "greater") {
        criticalValue1 = jStat.normal.inv(significanceLevel, mean, standardDeviation);
        criticalValue2 = Infinity;
    } else {
        criticalValue1 = -Infinity;
        criticalValue2 = jStat.normal.inv(1 - significanceLevel, mean, standardDeviation);
    }

    // Calculate the test statistic (z-score) or (t-score)
    var testStatistic = sampleMean;

    // Perform the hypothesis test and update the result
    var result;
    console.log(testStatistic, criticalValue1, criticalValue2);
    if (testStatistic < criticalValue1 || testStatistic > criticalValue2) {
        result = "Reject the null hypothesis";
    } else {
        result = "Fail to reject the null hypothesis";
    }

    if (criticalValue1 == -Infinity)
        criticalValue1 = mean - 4 * standardDeviation;
    if (criticalValue2 == Infinity)
        criticalValue2 = mean + 4 * standardDeviation;

    var canvas = document.getElementById('normal-distribution-canvas');
    var ctx = canvas.getContext('2d');

    // Define the canvas dimensions
    var canvasWidth = 600; // Increase the canvas width as desired
    var canvasHeight = 400; // Increase the canvas height as desired
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Define the mean and standard deviation of the normal distribution
    var distributionMean = mean;
    var distributionStandardDeviation = standardDeviation;

    // Define the x-axis range
    var xMin = distributionMean - 4 * distributionStandardDeviation;
    var xMax = distributionMean + 4 * distributionStandardDeviation;

    // Calculate the step size for drawing the curve
    var stepSize = (xMax - xMin) / canvasWidth;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the x-axis
    var xAxisY = canvasHeight / 2;
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvasWidth, xAxisY);
    ctx.stroke();

    // Draw the normal distribution curve
    ctx.beginPath();
    for (var x = xMin; x <= xMax; x += stepSize) {
        var y = (1 / (Math.sqrt(2 * Math.PI) * distributionStandardDeviation)) * Math.exp(-((x - distributionMean) ** 2) / (2 * (distributionStandardDeviation ** 2)));
        var yPixel = canvasHeight / 2 - (y * canvasHeight / 2);
        var xPixel = (x - xMin) * canvasWidth / (xMax - xMin);
        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();

    // Shade the valid region
    var validRegionStartPixel = (criticalValue1 - xMin) * canvasWidth / (xMax - xMin);
    var validRegionEndPixel = (criticalValue2 - xMin) * canvasWidth / (xMax - xMin);
    ctx.fillStyle = 'rgba(0, 128, 0, 0.2)';
    ctx.fillRect(validRegionStartPixel, 0, validRegionEndPixel - validRegionStartPixel, canvasHeight);

    // Draw a vertical line to represent the sample mean
    var sampleMeanPixel = (testStatistic - xMin) * canvasWidth / (xMax - xMin);
    ctx.beginPath();
    ctx.moveTo(sampleMeanPixel, 0);
    ctx.lineTo(sampleMeanPixel, canvasHeight);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Sample Mean: ' + testStatistic.toFixed(2), sampleMeanPixel + 10, canvasHeight / 3);

    // Mark the value of the start point
    ctx.fillText('Start: ' + criticalValue1.toFixed(2), validRegionStartPixel - 50, 20);

    // Mark the value of the end point
    ctx.fillText('End: ' + criticalValue2.toFixed(2), validRegionEndPixel + 10, 20);

    // Display the test result
    var resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = "<strong>Test Result: </strong>" + result;
}





function hypothesisTest2() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validate the number of checkboxes selected
    if (checkboxes.length !== 1) {
        alert("Please select exactly one sample.");
        return;
    }

    // Get the sample IDs from the checkboxes
    const sampleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Getting data for the selected samples
    const mydata = sampleIds.map(sampleId => {
        const input = document.getElementById(sampleId);
        const values = input.value.trim().split(/\s+/).map(Number);
        return {
            label: sampleId,
            values: values
        };
    });

    // Get the population mean, sample standard deviation, sample size, and significance level
    const mean = parseFloat(document.getElementById('value').value);
    const standardDeviation = calculateStandardDeviation(mydata[0].values);
    const n = mydata[0].values.length;
    const significanceLevel = parseFloat(document.getElementById('significanceLevel').value) / 100;

    // Calculate the standard error
    const standardError = standardDeviation / Math.sqrt(n);

    // Determine the operator selected for the null hypothesis
    const operatorSelect = document.getElementById('operator1');
    const operatorValue = operatorSelect.options[operatorSelect.selectedIndex].value;

    const degreesOfFreedom = n - 1;
    // Calculate the test statistic (t-score)
    const testStatistic = (jStat.mean(mydata[0].values) - mean) / standardError;

    // Calculate the critical value (z-score) or (t-score) based on the significance level and operator selected
    var criticalValue1;
    var criticalValue2;
    if (operatorValue === "equal") {
        criticalValue1 = jStat.studentt.inv(significanceLevel / 2, degreesOfFreedom);
        criticalValue2 = jStat.studentt.inv(1 - significanceLevel / 2, degreesOfFreedom);
    } else if (operatorValue === "greater") {
        criticalValue1 = jStat.studentt.inv(significanceLevel, degreesOfFreedom);
        criticalValue2 = Infinity;
    } else {
        criticalValue1 = -Infinity;
        criticalValue2 = jStat.studentt.inv(1 - significanceLevel, degreesOfFreedom);
    }


    // Perform the hypothesis test and update the result
    var result;
    console.log(testStatistic, criticalValue1, criticalValue2);
    if (testStatistic < criticalValue1 || testStatistic > criticalValue2) {
        result = "Reject the null hypothesis";
    } else {
        result = "Fail to reject the null hypothesis";
    }

    if (criticalValue1 == -Infinity)
        criticalValue1 = mean - 4 * standardDeviation;
    if (criticalValue2 == Infinity)
        criticalValue2 = mean + 4 * standardDeviation;

    var canvas = document.getElementById('normal-distribution-canvas');
    var ctx = canvas.getContext('2d');

    // Define the canvas dimensions
    var canvasWidth = 600; // Increase the canvas width as desired
    var canvasHeight = 400; // Increase the canvas height as desired
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Define the mean and standard deviation of the normal distribution
    var distributionMean = 0;
    var distributionStandardDeviation = 1;

    // Define the x-axis range
    var xMin = distributionMean - 4 * distributionStandardDeviation;
    var xMax = distributionMean + 4 * distributionStandardDeviation;

    // Calculate the step size for drawing the curve
    var stepSize = (xMax - xMin) / canvasWidth;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the x-axis
    var xAxisY = canvasHeight / 2;
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvasWidth, xAxisY);
    ctx.stroke();

    // Draw the normal distribution curve
    ctx.beginPath();
    for (var x = xMin; x <= xMax; x += stepSize) {
        var y = (1 / (Math.sqrt(2 * Math.PI) * distributionStandardDeviation)) * Math.exp(-((x) ** 2) / (2 * (distributionStandardDeviation ** 2)));
        var yPixel = canvasHeight / 2 - (y * canvasHeight / 2);
        var xPixel = (x - xMin) * canvasWidth / (xMax - xMin);
        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();

    // Shade the valid region
    var validRegionStartPixel = (criticalValue1 - xMin) * canvasWidth / (xMax - xMin);
    var validRegionEndPixel = (criticalValue2 - xMin) * canvasWidth / (xMax - xMin);
    ctx.fillStyle = 'rgba(0, 128, 0, 0.2)';
    ctx.fillRect(validRegionStartPixel, 0, validRegionEndPixel - validRegionStartPixel, canvasHeight);

    // Draw a vertical line to represent the sample mean
    var sampleMeanPixel = (testStatistic - xMin) * canvasWidth / (xMax - xMin);
    ctx.beginPath();
    ctx.moveTo(sampleMeanPixel, 0);
    ctx.lineTo(sampleMeanPixel, canvasHeight);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    // Mark the value of the teststatistic
    // Mark the value of the vertical line
    ctx.font = '12px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('T-statistics: ' + testStatistic.toFixed(2), sampleMeanPixel + 10, canvasHeight / 3);

    // Mark the value of the start point
    ctx.fillText('Start: ' + criticalValue1.toFixed(2), validRegionStartPixel - 50, 20);

    // Mark the value of the end point
    ctx.fillText('End: ' + criticalValue2.toFixed(2), validRegionEndPixel + 10, 20);



    // Display the test result
    var resultArea = document.getElementById('data-result-area');
    resultArea.innerHTML = "<strong>Test Result: </strong>" + result;
}