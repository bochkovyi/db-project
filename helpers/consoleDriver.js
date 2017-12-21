console.log("starting app, to exit - print \"exit\"");
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  text = text.trim();
  if (text === 'exit') {
    done();
  }
  else {
    console.log("you entered: " + text);
  }
});
function done() {
  console.log('App closed');
  process.exit();
}