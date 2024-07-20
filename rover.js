const Message = require('./message.js');
const Command = require('./command.js');

let message = new Message ("nameGiven", "commandsArrayGiven");

class Rover {
  constructor (position, generatorWatts = 110) {
   this.position = position;
   this.mode = "NORMAL";
   this.generatorWatts = generatorWatts;
  }

  receiveMessage(message = new Message (named, commands)) {
   return class RoverMessage {
      constructor () {
         this.message = message.named;
         this.results = message.commands;
      }
   }
   
  }
}

module.exports = Rover;