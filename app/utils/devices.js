export function connect(device, portOrName) {
  if (typeof portOrName === 'string') {
    return connect(device, findPortByName(device, portOrName));
  } else {
    console.log(`Connecting to port ${portOrName} (${device.getPortName(portOrName)})...`);
    device.openPort(portOrName);
  }
}

export function findPortByName(device, name) {
  let count = device.getPortCount();

  for (let i=0; i<count; i++) {
    if (device.getPortName(i) === name) {
      return i;
    }
  }

  throw new Error(`Cannot find port for ${name}`);
}
