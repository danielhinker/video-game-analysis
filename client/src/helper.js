const divStyle = {
  maxWidth: "1200px",
  height: "500px",
  margin: "40px auto 10px",
};

let config = {
  debug: true,
  defaultSeries_type: "column",
  legend_visible: false,
  defaultPoint_label_visible: true,
  yAxis_visible: false,
  xAxis_defaultTick: {
    placement: "inside",
    label_style: {
      color: "#fff",
      fontWeight: "bold",
    },
  },
  series: [
    {
      name: "Genres",
      palette: "default",
      points: [
        { name: "Sports", y: 30 },
        { name: "Platform", y: 30 },
        { name: "Racing", y: 30 },
        { name: "Misc", y: 30 },
        { name: "Shooter", y: 30 },
        { name: "Role-Playing", y: 30.15 },
        { name: "Puzzle", y: 118 },
        { name: "Simulation", y: 136 },
        { name: "Action", y: 130 },
        { name: "Fighting", y: 136 },
        { name: "Adventure", y: 136 },
        { name: "Strategy", y: 136 },
      ],
    },
  ],
};


let projectedChart = {
    debug: true,
    type: 'columnSubtle',
    xAxis: { label_text: 'Genre'  },
    yAxis: {
      label_text: 'Average Sales in Millions',
      defaultTick_label_text: '%value'
    },
    defaultPoint: {
      // tooltip: '<b>%name</b> <br/> Average: %yValue<br/> Highest: %yMax<br/> Lowest: %ymin',
      subvalue_line_width: 2
    },
    legend_visible: false,
    title: {
      label_text: 'Estimated Sales [Best: %maxPointName %ymax, Worst: %minPointName %ymin]'
    },
    series: [
      {
        name: 'Score Estimates',
        points: {
          mapTo: 'name,y,subvalue.range',
          data: [
            ['Sports',50,[  30,  70] ],
            ['Platform',50,[  30,  70] ],
            ['Racing',50,[  30,  70] ],
            ['Misc',50,[  30,  70] ],
            ['Shooter',50,[  30,  70] ],
            ['Role-Playing',50,[  30,  70] ],
            ['Puzzle',50,[  30,  70] ],
            ['Simulation',50,[  30,  70] ],
            ['Action',50,[  30,  70] ],
            ['Fighting',50,[  30,  70] ],
            ['Adventure',50,[  30,  70] ],
            ['Strategy',50,[  30,  70] ],
          ]
        }
      }]}; 

      var pieChart = { 
        debug: true, 
        title_position: 'center', 
        legend: { 
          template: 
            '%value {%percentOfTotal:n1}% %icon %name', 
          position: 'inside left bottom'
        }, 
        defaultSeries: { 
          type: 'pie', 
          pointSelection: true
        }, 
        defaultPoint_label_text: '<b>%name</b>', 
        title_label_text: 'Average Sales by Genre', 
        yAxis: { label_text: 'Sales', formatString: 'n' }, 
        series: [ 
          { 
            name: 'Genres', 
            points: [ 
              { name: "Sports", y: 30 },
              { name: "Platform", y: 30 },
              { name: "Racing", y: 30 },
              { name: "Misc", y: 30 },
              { name: "Shooter", y: 30 },
              { name: "Role-Playing", y: 30.15 },
              { name: "Puzzle", y: 118 },
              { name: "Simulation", y: 136 },
              { name: "Action", y: 130 },
              { name: "Fighting", y: 136 },
              { name: "Adventure", y: 136 },
              { name: "Strategy", y: 136 },
            ] 
          } 
        ] 
      }; 
  

export { config, projectedChart, pieChart, divStyle };