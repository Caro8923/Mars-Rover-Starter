const Message = require('./message.js');
const Command = require('./command.js');


class Rover {
  constructor (position, mode = "NORMAL", generatorWatts = 110) {
   this.position = position;
   this.mode = mode
   this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
      let response = {};
      response.message = message.name;
      response.results = [];
      for (let i=0; i < message.commands.length; i++) {
         let entry = {};
         entry.completed = true;
         
         if (message.commands[i].commandType === "STATUS_CHECK"){
            entry.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position,
            }
         } else if (message.commands[i].commandType === "MODE_CHANGE"){
            if (message.commands[i].value === "LOW_POWER" || message.commands[i].value === "NORMAL") {
               this.mode = message.commands[i].value;
            } else {
               entry.completed = false;
            }
         } else if (message.commands[i].commandType === "MOVE"){
            if (this.mode === "LOW_POWER") {
               entry.completed = false;
            } else {
               this.position = message.commands[i].value;
            } 
         }
      
         response.results.push(entry);
      }
      
      return response; 
  }
}


module.exports = Rover;