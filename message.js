
let named  = "";
let commands = [];

class Message {
   constructor(named, commands) {
      this.name = named;
      if (!named) {
         throw Error ("Name required.");
      }
      this.commands = commands;
   }

}

module.exports = Message;