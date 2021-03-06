const noflo = require('noflo');
const {spawn} = require('child_process');
exports.getComponent = () => {
  
  const c = new noflo.Component();
  c.icon = 'file';

  c.inPorts.add('in', {
      datatype: 'int'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });

  c.process((input, output) => {

    if (!input.hasData('in')) {
      return;
    }

    var data=input.getData('in');
    const python = spawn('python', ['SortValues.py',data]);
      
      var dataToSend;
      python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        output.send({
          out: dataToSend 
        });
      });
              
      output.done();

      python.stderr.on('data', function (data) {
          console.error(`stderr: ${data}`);
      });
    
     
  });
  return c;
}