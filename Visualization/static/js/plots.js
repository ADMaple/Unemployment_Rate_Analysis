// Create a variable that holds each index
var ue_rates = data.unemployment;
var fed_rates = data.federal_ir;
var cpi_rates = data.cpi;
var gdp_rates = data.gdp;
var ppi_rates = data.ppi;
var inflation_rates = data.inflation_rate;

// Create a variable that filters the unemployment and metadata for the object with the desired date.
var chartArray = ue_rates.filter(chartObj => chartObj.id == ddates);
var chartArray = metadata.filter(chartObj => chartObj.id == ddates);
var chartArray = names.filter(chartObj => chartObj.id == names);  
// Create a variable that holds the first sample in the array.
var chartResult = chartArray[0];
var meta_values= chartResult.metadata;
var names = chartResult.names;
  
//---------------- Bar Chart ------------------
// Create the yticks for the bar chart.  
JSC.Chart("chartDivId", {
  yticks: [
    {
      fed_rates
    },
    {
      cpi_rates
    },
    {
      gdp_rates
    },
    {
     ppi_rates
    },
    {
     inflation_rates
    }
  ]
}) 
    var yticks =  ue_rates.map(metadata => `rates ${metadata}`);

    //Create the trace for the bar chart. 
    var barData = [{
      x: ue_rates,
      y: yAxis,
      text: yticks.map(row => names),
      type: "bar",
      orientation: "h"}
    ];

    // Create the layout for the bar chart. 
    var barLayout = {
     title: "Impact on Unemployment Rates",
     margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 30
      }
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);


    //---------------- Deliverable 2 Bubble Chart ------------------
    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: ue_rates,
      y: metadata,
      text: unemployment,
      mode: 'markers',
      marker: {
        size: meta_values,
        sizeref: 0.04,
        sizemode: 'area',
        color: datesData,
        colorscale: "Earth"
      }
    }];
    // Create the layout for the bubble chart.
    var bubbleLayout = {
          title: "Rates per Indicies",
          xaxis: {
            title: {
              text: "rate"}},
          hovermode: 'closest',
          height: 600,
          width: 1100
    };
    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);