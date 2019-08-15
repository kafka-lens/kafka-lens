class MessageBuffer {
  /**
   *
   * @param {Number} size Maximum size of the buffer. This will store a fixed number of items.
   * Once the limit is reached, it will start removing items from the front of the buffer
   */
  constructor(size) {
    this.maxSize = size;
    this.array = { 0: '' };
    this.length = 0;
    this.hiIndex = -1;
    this.loIndex = 0;
    this.winStart = 0;
    this.winEnd = 0;
  }

  /**
   *
   * @param {{offset: *, partitionId: *, topicName: *, value: *, key: *, timestamp: (*|string)}} item Any data type to be added to the end of the queue.
   * This will add data to the end of the queue. If the item added causes the length of the queue to
   * exceed the maximum size of the buffer, this will also cause the buffer to drop the oldest data.
   */
  queue(item) {
    this.hiIndex += 1;
    this.array[this.hiIndex] = item;
    if (this.length < 50) this.winEnd = this.hiIndex;
    this.length += 1;
    // Begin logic to delete from beginning of array if maxSize is reached
    if (this.maxSize && this.length > this.maxSize) {
      delete this.array[this.loIndex];
      this.loIndex += 1;
      if (this.winStart < this.loIndex) {
        this.winStart = this.loIndex;
        if (this.winEnd - this.winStart < 50) {
          // this line may not be needed
          if (this.winStart + 50 > this.length) {
            this.winEnd = this.hiIndex;
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
   * @param {*} mainWindow Send the window where resulting array needs to tbe sent
   * Will create an array of items needed for display to the passed Electron window.
   */
  getNextSegment(mainWindow) {
    const segment = [];
    for (let i = this.winEnd; i > this.winStart - 1; i -= 1) {
      segment.push(this.array[i]);
    }
    mainWindow.webContents.send('partition:getMessages', segment);
    if (this.length > 50) {
      delete this.array[this.winStart];
      this.length -= 1;
      this.loIndex += 1;
      this.winStart += 1;
      this.winEnd += 1;
    }
  }
}

module.exports = MessageBuffer;
