category = 'Seattle'
function onCategoryChanged() {
  var select = d3.select('#citySelect').node();
  // Get current value of select element
  category = select.options[select.selectedIndex].value;
  update(x.invert(currentValue), category)

        //append tooltip
        svg.call(toolTip);
        actMaxCircles.on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide);
        actMinCircles.on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide);
  // Update chart with the selected category of letters
  // updateChart(category)
}

var svg = d3.select('.temperature');

svg.append("text")
        .attr("x", 150)
        .attr("y", 150)
        .attr('class','subTitle')
        .text("Temperature")
        .attr('transform','translate(-10,95)')
svg.append("text")
        .attr("x", 280)
        .attr("y", 170)
        .text('Areas shaded red represent the range between daily high and low')
        .attr('class','sub')
        .attr('transform','translate(-30,70)')
svg.append("text")
        .attr("x", 280)
        .attr("y", 170)
        .text('Areas shaded gray represent the range between average high and low')
        .attr('class','subAvg')
        .attr('transform','translate(-30,87)')

// create tooltip
var toolTip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-12, 0])
  .html(function(d) {
      return "<h5>"+ d.date + '<br>'+ "Actual range: "+d.actual_min_temp+"° - "+d.actual_max_temp+
        "°<br>Average range: "+d.average_min_temp+"° - "+d.average_max_temp+"°</h5>";
  });


// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 100, r: 100, b: 100, l: 100};
var cellPadding = 10;

var chartG = svg.append('g')
    .attr('transform', 'translate(50,325)')
    .attr('class','lineChart');
var cellWidth = (svgWidth - padding.l - padding.r) / 2;
var cellHeight = (svgHeight - padding.t - padding.b) / 2;

var xScale = d3.scaleTime().range([0, svgWidth-100]);
var yScale = d3.scaleLinear().range([cellHeight - cellPadding, 0]);
var parseTime = d3.timeParse("%Y-%m-%e");
var formartTime = d3.timeFormat("%Y-%m-%e");
xAxis = xScale.domain([parseTime('2014-7-1'),parseTime('2015-6-30')]);
yAxis = yScale.domain([0,100]);

var xAxis = d3.axisBottom(xScale)
    chartG.append('g').attr('class','x axis').call(xAxis).attr('transform', function(){
        return 'translate(0,'+ cellHeight + ')';
    }).selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")
    .attr("font-weight","bold");
var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)


//slider
var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2014-7-1"),
    endDate = new Date("2015-06-31");

var margin = {top:50, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var svg = d3.select("#vis")
//     .select('svg')
// slider
////////// slider //////////

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height/3 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue), category);
                //append tooltip
  svg.call(toolTip);
  actMaxCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);
  actMinCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return formatDate(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0,-20)")

//data

d3.csv('KHOU.csv',dataPreprocessor).then(function(dataset) {
  hou = dataset

  // Create map for each attribute's extent
});

d3.csv('KNYC.csv',dataPreprocessor).then(function(dataset) {
  nyc = dataset

  // Create map for each attribute's extent
});

d3.csv('KSEA.csv',dataPreprocessor).then(function(dataset) {
  sea = dataset
  // linePlot(dataset)
  // precipitation(dataset)

  playButton
  .on("click", function() {
  var button = d3.select(this);
  if (button.text() == "Pause") {
    moving = false;
    clearInterval(timer);
    // timer = 0;
    button.text("Play");

      //append tooltip
  svg.call(toolTip);
  actMaxCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);
  actMinCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);
  } else {
    moving = true;
    timer = setInterval(step, 100);
    button.text("Pause");
  }
  console.log("Slider moving: " + moving);
})
});

function prepare(d) {
  d.id = d.id;
  d.date = parseDate(d.date);
  return d;
}

function step() {
  update(x.invert(currentValue), category);
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
  }
}

function updateChart(city) {
  var cityDs = []
  if (city == 'Houston') {
    cityDs = hou;
  } else if (city == 'New York') {
    cityDs = nyc;
  } else if (city == 'Seattle') {
    cityDs = sea;
  }

  linePlot(cityDs)

}

function linePlot(data) {

  var countMax = 0
  chartG.select('.linearea').remove()
  d3.select('.countDays').remove()
  linearea = chartG.append('g').attr('class','linearea')

  //draw actual data
    var maxLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) { return yScale(d.actual_max_temp); });
  var minLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) { return yScale(d.actual_min_temp); });

  var area = d3.area()
      .x(function(d) {return xScale(parseTime(d.date)); })
        .y0(function  (d) { return yScale(d.actual_max_temp); })
        .y1(function(d) { return yScale(d.actual_min_temp); });


  var drawarea = linearea.append("path")
  .datum(data)
  .attr("class", "area")
  .attr("d", area)

  //Data join for paths
  var drawMaxLine = linearea.append("path")
  .datum(data)
  .attr("class", "maxLine")
  .attr("d", maxLine)


  //Data join for paths
  var drawMinLine = linearea.append("path")
  .datum(data)
  .attr("class", "minLine")
  .attr("d", minLine)


  // var labelActualMax = linearea.append("text")
  //       .text("actual max temperature")
  //       .attr("class", "labelActual")
  //       .attr("x", 280)
  //       .attr("y", 0)


  // var labelActualmin = linearea.append("text")
  // .text("actual min temperature")
  // .attr("class", "labelActual")
  // .attr("x", 270)
  // .attr("y",150)



  // add circles and append tooltip
  actMaxCircles = linearea.selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", function(d) {
          if (d.actual_max_temp > d.average_max_temp) {
            countMax = countMax + 1
            return "white"
          } else {
            return "#0066a3"
          }
        })
        .attr("stroke", "#ee3636")
        .attr("cx", function(d) { return xScale(parseTime(d.date)) })
        .attr("cy", function(d) { return yScale(d.actual_max_temp) })
        .attr("r", 2)

  // actMaxCircles.on('mouseover', toolTip.show)
  //       .on('mouseout', toolTip.hide);

  actMinCircles = linearea.selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
        .attr("fill", function(d) {
          if (d.actual_min_temp < d.average_min_temp) {
            return "white"
          } else if (d.actual_min_temp > d.average_max_temp){
            return "white"
          } else {
            return "#0066a3"
          }
        })
        .attr("stroke", "#ee3636")
        .attr("cx", function(d) { return xScale(parseTime(d.date)) })
        .attr("cy", function(d) { return yScale(d.actual_min_temp) })
        .attr("r", 2)



    //draw record data
    var recMinLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) {
      return yScale(d.average_min_temp); });
    var drawRecMinLine = linearea.append("path")
    .datum(data)
    .attr("class", "recMinLine")
    .attr("d", recMinLine)

    var recMaxLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) {
      return yScale(d.average_max_temp); });
    var drawRecMaxLine = linearea.append("path")
    .datum(data)
    .attr("class", "recMaxLine")
    .attr("d", recMaxLine)

    var avgArea = d3.area()
    .x(function(d) {return xScale(parseTime(d.date)); })
      .y0(function  (d) { return yScale(d.average_min_temp); })
      .y1(function(d) { return yScale(d.average_max_temp); });
    var drawRecArea = linearea.append("path")
    .datum(data)
    .attr("class", "avgArea")
    .attr("d", avgArea)

    // var labelAvgMax = linearea.append("text")
    // .text("average max temperature")
    // .attr("class", "avgLabel")
    // .attr("x", 1300)
    // .attr("y", 20)

    // var labelAvglmin = linearea.append("text")
    // .text("average min temperature")
    // .attr("class", "avgLabel")
    // .attr("x", 1300)
    // .attr("y", 160)

    // svg.append("text")
    //     .attr("x", 280)
    //     .attr("y", 70)
    //     .attr('class','countDays')
    //     .text('There were ' + countMax + " days of the year when the actual max temperature was above the average max temeperature.")
    //     .attr('transform','translate(-210,20)')
    //     .attr('fill','#F71921')

}

function update(h, city) {
  var cityDs = []
  if (city == 'Houston') {
    cityDs = hou;
  } else if (city == 'New York') {
    cityDs = nyc;
  } else if (city == 'Seattle') {
    cityDs = sea;
  }

  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

  // filter data set and redraw plot
  var newData = cityDs.filter(function(d) {
    return parseTime(d.date) < h;
  })
  linePlot(newData);
}


function dataPreprocessor(row) {
  return {
      'date': row['date'],
      'actual_mean_temp': +row['actual_mean_temp'],
      'actual_min_temp': +row['actual_min_temp'],
      'actual_max_temp': +row['actual_max_temp'],
      'average_min_temp': +row['average_min_temp'],
      'average_max_temp': +row['average_max_temp'],
      'record_min_temp': +row['record_min_temp'],
      'record_max_temp': +row['record_max_temp'],
      'record_min_temp_year': +row['record_min_temp_year'],
      'record_max_temp_year': +row['record_max_temp_year'],
      'actual_precipitation': +row['actual_precipitation'],
      'average_precipitation': +row['average_precipitation'],
      'record_precipitation': +row['record_precipitation']
  };
}

