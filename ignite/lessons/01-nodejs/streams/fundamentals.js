/**
 * process.stdin -> reads the process
 * process.stdout -> write the process
 * all through the pipe
 * to execute: run yarn dev and start typing in the console
 * process.stdin.pipe(process.stdout);
 */

/**
 * instead of a program reading a file into memory all at once
 * like in the traditional way, streams read chunks of data piece by piece,
 * processing its content without keeping it all in memory.
 */

import {Readable, Transform, Writable} from "node:stream";

// readable stream
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

// writable stream
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// transform stream
class TransformNumberToNegative extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

//new OneToHundredStream().pipe(process.stdout);
//new OneToHundredStream().pipe(new MultiplyByTenStream());

new OneToHundredStream()
  .pipe(new TransformNumberToNegative())
  .pipe(new MultiplyByTenStream());
