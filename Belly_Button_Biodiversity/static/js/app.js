function buildMetadata(sample) {


  const url = "http://robdunnlab.com/projects/belly-button-biodiversity/";

// Fetch the JSON data and console log it
d3.json(url).then(
  function(data) {
    var panel = d3.select('#sample-metadata') 
    panel.html("")
    for (var key in data){
      var h6tag = panel.append("h6").text(`${key}`)
    }
  console.log(data);
}
);

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
// @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample dat
function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then(
    function(data) {
    console.log(data);
    var data2 = [trace1];
    var bubbleChart = d3.select("#bubble")
  
  
    var layout = {
      title: "Bubble Chart",
      height: 600,
      width:600
    }
  
    var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        mode: 'markers',
        markers: {
        color: data.otu_ids,
        size: data.sample_values
          }
       };
      Plotly.plot(bubbleChart, data2, layout);
  
      // @TODO: Build a Pie Chart
      var pie_values = data.sample_values.slice(0,10);
      var pie_labels = data.otu_ids.slice(0,10);
      var pie_hover = data.otu_labels.slice(0,10);
  
      var data = [{
        values: pie_values,
        labels: pie_labels,
        hovertext: pie_hover,
        type: 'pie'
      }];
  
      Plotly.newPlot('pie', data);
  });

  

  }  
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();