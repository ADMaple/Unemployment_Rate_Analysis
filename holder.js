}
// Demographics Panel 
function buildMetadata(datesData) {
  d3.json("unemployment_data.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(datesDataObj => datesDataObj.id == datesData);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#date-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
//---------------- Bar Chart ------------------
// 1. Create the buildCharts function.
function buildCharts(datesData) {

  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("unemployment_data.json").then((data) => {

    // 3. Create a variable that holds the array. 
    var Dates = data.dates;

    // 4. Create a variable that filters  for the object with the desired 
    var chartArray = Dates.filter(chartObj => chartObj.id == datesData);
    // Create a variable that filters the array for the object with the desired sample number (for guage)
    var metadataArray = data.metadata.filter(chartObj => chartObj.id == datesData);
    var wfreq= metadataArray[0].wfreq

    // 5. Create a variable that holds the first sample in the array.
    var chartResult = chartArray[0];
    // Create a variable that holds the first sample in the metadata array (for guage)
    var guageResult= metadataArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var rate_ids = chartResult.unemployment_data;
    var rate_labels = chartResult.ue_labels;
    var rate_values = chartResult.ue_values;
    //---------------- Bar Chart ------------------
    // 7. Create the yticks or the bar chart. Get the the top 10 otu_ids and map them in descending order  
    var yticks =  otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: yticks.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"}
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "Top 10 Bacteria Cultures Found",
     margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 30
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    //---------------- Deliverable 2 Bubble Chart ------------------
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        sizeref: 0.04,
        sizemode: 'area',
        color: otu_ids,
        colorscale: "Earth"
      }
    }];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          xaxis: {
            title: {
              text: "OTU ID"}},
          hovermode: 'closest',
          height: 600,
          width: 1100
    };
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}