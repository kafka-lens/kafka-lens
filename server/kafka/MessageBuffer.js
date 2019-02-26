class MessageBuffer {
  /**
   *
   * @param {Number} size This is the maximum size of the buffer
   * This buffer will store a predetermined number of items. Once that size has been reached, the buffer will start
   * removing items from the front of the buffer
   */
  constructor(size) {
    this.maxSize = size;
    this.array = { 0: null };
    this.length = 0;
    this.loIndex = 0;
    this.winStart = 0;
    this.winEnd = 0;
  }

  /**
   *
   * @param {any} item Any data type to be added to the end of the queue.
   * This will add data to the end of the queue. If the item added causes the length of the queue to
   * exceed the maximum size of the buffer, this will also cause the buffer to drop the oldest data in the buffer
   */
  queue(item) {
    this.array[this.length] = item;
    if (this.length < 50) this.winEnd = this.length;
    this.length += 1;
    if (this.maxSize && this.length > this.maxSize) {
      delete this.array[this.loIndex];
      this.loIndex += 1;
      if (this.winStart < this.loIndex) {
        this.winStart = this.loIndex;
        if (this.winEnd - this.winStart < 50) {
          // this line may not be needed
          if (this.winStart + 50 > this.length) {
            this.winEnd = this.length - 1;
          } else {
            this.winEnd = this.winStart + 50;
          }
        }
      }
      this.length -= 1;
    }
  }

  /**
   * Function will delete the item at the beginning of the queue and return that item
   */
  dequeue() {
    const temp = this.array[this.loIndex];
    // To delete or set undefined? That is the question.
    delete this.array[this.loIndex];
    this.loIndex += 1;
    this.length -= 1;
    if (this.length < 50 && this.winStart < this.loIndex) this.winStart = this.loIndex;
    return temp;
  }

  /**
   *
   * @param {Electron Window} mainWindow Send the window where resulting array needs to tbe sent
   * Will create an array of items needed for display to the passed Electron window.
   */
  getNextSegment(mainWindow) {
    const array = [];
    for (let i = this.winEnd; i > this.winStart - 1; i -= 1) {
      array.push(this.array[i]);
    }
    mainWindow.webContents.send('partition:getMessages', array);
    if (this.length > 50) {
      delete this.array[this.winStart];
      this.length -= 1;
      this.winStart += 1;
      this.winEnd += 1;
    }
  }
}

module.exports = MessageBuffer;
