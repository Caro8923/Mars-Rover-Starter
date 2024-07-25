const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover ("position");
    expect(rover.position).toBe("position");
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover("position");
    let commandsArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message ("Test message with two commands", commandsArray);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let rover = new Rover("position");
  let commandsArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message ("Test message with two commands", commandsArray);
  let response = rover.receiveMessage(message);
  expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command", function() {
  let rover = new Rover(98382);
  let commandsArray= [new Command('STATUS_CHECK')];
  let message = new Message ("Test message for Status Check", commandsArray);
  let response = rover.receiveMessage(message);
  let expected = {completed : true, roverStatus: {mode : "NORMAL", generatorWatts : 110, position : 98382}};
  expect(response.results[0].completed).toBe(true);
  expect(response.results[0]).toEqual(expected);
  });

  it("responds correctly to the mode change command", function() {
  let rover = new Rover(98382);
  let commandsArray = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message ("Test message for Mode Change - Low Power", commandsArray);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.mode).toBe("LOW_POWER");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  let rover = new Rover(98382, "LOW_POWER");
  let commandsArray = [new Command('MOVE', 90000)];
  let message = new Message ("Test message for Move", commandsArray);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(false);
  expect(rover.position).toBe(98382);
  }); 

  it("responds with the position for the move command", function(){
  let rover = new Rover(98382);
  let commandsArray = [new Command('MOVE', 90000)];
  let message = new Message ("Test message for Move", commandsArray);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.position).toBe(90000);
  });
});
