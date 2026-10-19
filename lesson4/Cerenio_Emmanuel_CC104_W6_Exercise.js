// Stack (LIFO) 
class Stack {
  constructor() { this.items = []; }
  push(el) { this.items.push(el); }              // add to top
  pop() { return this.isEmpty() ? null : this.items.pop(); } // remove & return top
  peek() { return this.isEmpty() ? null : this.items[this.items.length - 1]; } // view top
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  toString() { return this.items.join(", "); }
}

// Queue (FIFO) 
class Queue {
  constructor() { this.items = []; }
  enqueue(el) { this.items.push(el); }            // add to back
  dequeue() { return this.isEmpty() ? null : this.items.shift(); } // remove & return front
  front() { return this.isEmpty() ? null : this.items[0]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  toString() { return this.items.join(", "); }
}


// Priority Queue (lower number = higher priority) 
class PriorityQueue {
  constructor() { this.items = []; }

  // insert before the first item with a lower priority; keeps arrival order for ties
  enqueue(request, priority) {
    const newItem = { request, priority };
    const index = this.items.findIndex((item) => priority < item.priority);
    if (index === -1) this.items.push(newItem);
    else this.items.splice(index, 0, newItem);
  }

  dequeue() { return this.isEmpty() ? null : this.items.shift(); } // remove highest priority
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  toString() {
    return this.items.map((i) => `${i.request}, Priority ${i.priority}`).join("\n");
  }
}

// Linked List (node-based, no array storage)
class Node {
  constructor(element) { this.element = element; this.next = null; }
}

class LinkedList {
  constructor() { this.head = null; this.length = 0; }

  // add element to the end
  append(element) {
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = newNode;
    }
    this.length++;
  }

  // insert element at a given index
  insert(position, element) {
    if (position < 0 || position > this.length) return false;
    const newNode = new Node(element);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head, previous = null, index = 0;
      while (index < position) { previous = current; current = current.next; index++; }
      newNode.next = current;
      previous.next = newNode;
    }
    this.length++;
    return true;
  }

  // remove & return the element at a given index
  removeAt(position) {
    if (position < 0 || position >= this.length) return null;
    let removed;
    if (position === 0) {
      removed = this.head;
      this.head = this.head.next;
    } else {
      let current = this.head, previous = null, index = 0;
      while (index < position) { previous = current; current = current.next; index++; }
      removed = current;
      previous.next = current.next;
    }
    this.length--;
    return removed.element;
  }

  // find the index of the first matching element (-1 if not found)
  indexOf(element) {
    let current = this.head, index = 0;
    while (current) {
      if (current.element === element) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // remove the first node matching the given element
  remove(element) {
    const index = this.indexOf(element);
    return index === -1 ? null : this.removeAt(index);
  }

  isEmpty() { return this.length === 0; }
  size() { return this.length; }
  toString() {
    const parts = [];
    let current = this.head;
    while (current) { parts.push(current.element); current = current.next; }
    return parts.join(", ");
  }
}

// Demo 
console.log("CAMPUS IT SUPPORT REQUEST MANAGER");
console.log("==================================\n");

// Part A: undo history via Stack
console.log("PART A: UNDO HISTORY");
const undoStack = new Stack();
undoStack.push("Opened Ticket #101");
undoStack.push("Assigned Ticket #101");
undoStack.push("Closed Ticket #101");
console.log("Top Action:", undoStack.peek());
console.log("Undo Action:", undoStack.pop());
console.log("Remaining Actions:", undoStack.toString());
console.log("Stack Size:", undoStack.size());
console.log("");

// Part B: waiting requests via Queue
console.log("PART B: WAITING REQUESTS");
const requestQueue = new Queue();
requestQueue.enqueue("Ticket #201 - Password Reset");
requestQueue.enqueue("Ticket #202 - No Internet");
requestQueue.enqueue("Ticket #203 - Printer Problem");
requestQueue.enqueue("Ticket #204 - Software Installation");
console.log("Next Request:", requestQueue.front());
console.log("Processed:", requestQueue.dequeue());
console.log("Processed:", requestQueue.dequeue());
console.log("Remaining Requests:", requestQueue.toString());
console.log("Queue Size:", requestQueue.size());
console.log("");

// Part C: urgent requests via Priority Queue
console.log("PART C: URGENT REQUESTS");
const urgentQueue = new PriorityQueue();
urgentQueue.enqueue("Ticket #301 - Install Browser", 3);
urgentQueue.enqueue("Ticket #302 - Server Offline", 1);
urgentQueue.enqueue("Ticket #303 - Faculty PC Failure", 2);
urgentQueue.enqueue("Ticket #304 - Internet Laboratory Down", 1);
console.log("Initial Priority Order:");
console.log(urgentQueue.toString());
const processedUrgent = urgentQueue.dequeue();
console.log("Processed Priority Request:", `${processedUrgent.request}, Priority ${processedUrgent.priority}`);
console.log("Remaining Priority Requests:");
console.log(urgentQueue.toString());
console.log("");

// Part D: completed requests via Linked List
console.log("PART D: COMPLETED REQUESTS");
const completedList = new LinkedList();
completedList.append("Ticket #401 - Account Activated");
completedList.append("Ticket #402 - Printer Connected");
completedList.append("Ticket #403 - Antivirus Updated");
completedList.insert(0, "Ticket #400 - Computer Diagnosed");
completedList.insert(completedList.size(), "Ticket #405 - Browser Updated");
console.log("Complete List:", completedList.toString());
console.log("Index of Ticket #402:", completedList.indexOf("Ticket #402 - Printer Connected"));
console.log("Removed at Position 1:", completedList.removeAt(1));
console.log("Removed by Value:", completedList.remove("Ticket #403 - Antivirus Updated"));
console.log("Final List:", completedList.toString());
console.log("Final Size:", completedList.size());
