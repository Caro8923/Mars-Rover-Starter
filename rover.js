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
         }
      
         response.results.push(entry);
      }
      
      return response; 
  }
}


module.exports = Rover;