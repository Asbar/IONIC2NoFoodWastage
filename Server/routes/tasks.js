var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:123@ds149511.mlab.com:49511/nofoodwastage',['tasks'])


// Get all tasks
router.get('/tasks',function(req,res,next){
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }else{
            res.json(tasks);
        }
    });
});

// Get Single tasks

router.get('/tasks/:id',function(req,res,next){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send(err);
        }else{
            res.json(task);
        }
    });
});


// Save tasks

router.post('/tasks',function(){
    var task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        })
    }else{
        db.tasks.save(task,function(err,task){
            if(err){
                res.send(err);
            }else{
                res.json(task);
            }
        });
    }
});

// Delete a task

router.put('/task/:id',function(req,res,next){
    
    var task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{
        db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){ 
    });
    }
});

// Delete task




module.exports = router;