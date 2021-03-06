var mongoose = require('mongoose');
var helpers = require('./helpers.js')
var Stage = require('./stage.js');

var projectSchema = mongoose.Schema({
    name: String,
    startDate: String,
    dueDate: String,
    
    // Calculated Properties
    //duration: helpers.getDuration(),
    //timestamp: helpers.getTimestamp(),
    
    // Status tracking
    isStarted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isAbandoned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    
    // Stages array
    // stages: [{type: mongoose.Schema.ObjectId, ref: 'Stage'}]
    stages: [Stage.stageSchema]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;