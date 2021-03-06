///////////////////////////////////////////////
// D3 Stage Pipeline Visualization
///////////////////////////////////////////////
var drawPipeline;

var initPipeline = function(svgPipelineContainer, scope) {
    
    // Layout variables
    var width = 1000;
    var height = 100;
    //var sidePadding = 0;
    //var topPadding = 0;

    // Create a color scale
    var pipelineColorScale = d3.scale.linear()
        .domain([0, 10])
        .range(['#1199BF', '#12BF25'])
        .interpolate(d3.interpolateHcl);
    
    // Accepts an array of Stage objects
    drawPipeline = function(data) {
        // Append our polygon groups and specify data to be entered
        var polyGroup = svgPipelineContainer.append('g')
            .classed('stage-item-group', true)
            .selectAll('polygon')
            .data(data)
            .enter();
        
        var polys = polyGroup.insert('polygon', ':first-child')
            .classed('stage-item', true)
            .style('stroke','white')
            .style('stroke-width', 2)
            .style('fill', function(d, i) {
                return d3.rgb(pipelineColorScale(i));
            })
            .attr('points', function(d, i) {
                var points = [[0,0],[150,0],[170,30],[150,60],[0,60]];
                
                if (i === 0) {
                    return points.join(' ');
                } else {
                    points[0][0] = points[0][0] + i * 150;
                    points[1][0] = points[1][0] + i * 150;
                    points[2][0] = points[2][0] + i * 150;
                    points[3][0] = points[3][0] + i * 150;
                    points[4][0] = points[4][0] + i * 150;
                }
                
                return points.join(' ');
            })
            .attr('data-stage', function(d, i) {
                return i;
            })
            .attr('ng-click', function(d, i){
                return 'setActiveStage('+ i +')';
            });
            
            var polyText = polyGroup.append('text')
                .classed('stage-text', true)
                .attr('font-size', '12')
                .attr('fill', 'white')
                .attr('y', 35)
                .attr('x', function(d, i) {
                    var x = 20;
                    if (i === 0) {
                        return x;
                    } else {
                        x = x + (i * 150) + 20;
                    }
                    return x;
                })
                .text(function(d) {
                    if(d.name.length > 16) {
                        // Truncate names
                        console.log('The name', d.name, d.name.length);
                        return d.name.substr(0, 16) + '...';
                    } else {
                        return d.name;
                    }
                });
        
            // Event Handlers on Polygons
            polys.on('mouseover', function() {
                var self = d3.select(this);
                var currentFill = self.style('fill');

                self.style('fill', function(){
                    return d3.rgb(currentFill).darker(1);
                });
            }).on('mouseout', function() {
                var self = d3.select(this);
                var currentFill = self.style('fill');

                self.style('fill', function(){
                    return d3.rgb(currentFill).brighter(1);
                });
            }).on('click', function(d, i) {
                var index = i;
                var self = d3.select(this);
                var x1 = 0;
                var x2 = 150;
                var stroke = self.style('fill');
                
                scope.setActiveTasks(i);
    
                // Remove all lines
                d3.selectAll('.active-stage').remove();
                
                // Add line under this polygon
                d3.selectAll('.stage-item-group').append('line', '.stage-item-group')
                    .classed('active-stage', true)
                    .attr('y1', '65')
                    .attr('y2', '65')
                    .style('stroke-width', 3)
                    .style('stroke', stroke)
                    .attr('x1', function() {
                        if (index === 0) {
                            return x1;
                        } else {
                            x1 = x1 + index * 150;
                            return x1;
                        }
                    })
                    .attr('x2', function() {
                        if (index === 0) {
                            return x2;
                        } else {
                            x2 = x2 + index * 150;
                            return x2;
                        }
                    });
            });

    } // End drawPipeline()
} // End initPipleline Function
