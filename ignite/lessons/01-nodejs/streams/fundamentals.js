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

import {Readable} from "node:stream";

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

new OneToHundredStream().pipe(process.stdout);
