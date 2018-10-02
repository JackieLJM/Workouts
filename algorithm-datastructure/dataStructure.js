//ES5用function实现List类
(function () {
    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
        this.clear = clear;
        this.find = find;
        this.toString = toString;
        this.insert = insert;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.length = length;
        this.currPos = currPos;
        this.moveTo = moveTo;
        this.getElement = getElement;
        this.length = length;
        this.contains = contains;
    }

    function append(element) {
        this.dataStore[this.listSize++] = element;
    }

    function find(element) {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] == element) {
                return i;
            }
        }
        return -1;
    }

    function remove(element) {
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this
                .dataStore
                .splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false;
    }

    function toString() {
        return this.dataStore;
    }

    function insert(element, after) {
        var insertPos = this.find(after);
        if (insertPos > -1) {
            this
                .dataStore
                .splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    }

    function clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    }

    function contains(element) {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (this.dataStore[i] == element) {
                return true;
            }
        }
        return false;
    }

    function front() {
        this.pos = 0;
    }

    function end() {
        this.pos = this.listSize - 1;
    }

    function prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }

    function next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos;
        }
    }

    function currPos() {
        return this.pos;
    }

    function moveTo(position) {
        this.pos = position;
    }

    function getElement() {
        return this.dataStore[this.pos];
    }
})();

//ES5用function实现栈结构
(function () {
    function Stack() {
        this.dataStore = [];
        this.top = 0;
        this.push = push;
        this.pop = pop;
        this.peek = peek;
        this.clear = clear;
        this.length = length;
    }

    function push(element) {
        this.dataStore[this.top++] = element;
    }

    function peek() {
        return this.dataStore[this.top - 1];
    }

    function pop() {
        return this.dataStore[--this.top];
    }

    function clear() {
        this.top = 0;
    }

    function length() {
        return this.top;
    }
    var s = new Stack();
    s.push("David");
    s.push("Raymond");
    s.push("Bryan");
    // console.log("length: " + s.length()); console.log(s.peek());
    var popped = s.pop();
    // console.log("The popped element is: " + popped); console.log(s.peek());
    s.push("Cynthia");
    // console.log(s.peek());
    s.clear();
    // console.log("length: " + s.length()); console.log(s.peek());
    s.push("Clayton");
    // console.log(s.peek());
})();

// ES5用function实现队列
(function () {
    function Queue() {
        this.dataStore = [];
        this.enqueue = enqueue;
        this.dequeue = dequeue;
        this.front = front;
        this.back = back;
        this.toString = toString;
        this.empty = empty;
    }

    function enqueue(element) {
        this
            .dataStore
            .push(element);
    }

    function dequeue() {
        return this
            .dataStore
            .shift();
    }

    function front() {
        return this.dataStore[0];
    }

    function back() {
        return this.dataStore[this.dataStore.length - 1];
    }

    function toString() {
        var retStr = "";
        for (var i = 0; i < this.dataStore.length; ++i) {
            retStr += this.dataStore[i] + "\n";
        }
        return retStr;
    }

    function empty() {
        if (this.dataStore.length == 0) {
            return true;
        } else {
            return false;
        }
    }
})();

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) 
        return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) 
                    Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}

// deep clone
var deepCopy = function (extendObj) {
    var str,
        newObj = extendObj.constructor === Array
            ? []
            : {};
    if (typeof extendObj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(extendObj);
        newObj = JSON.parse(str);
    } else {
        for (var key in extendObj) {
            if (!extendObj.hasOwnProperty(key)) 
                return;
            newObj[key] = typeof extendObj[key] === 'object'
                ? cloneObj(extendObj[key])
                : extendObj[key];
        }
    }
    return newObj;
};

var obj2 = {
    names: ['test0', 'test1', 'test3']
};

var obj1 = deepCopy(obj2);

console.log(obj1, obj2);

obj2.names[1] = 'test0';

console.log(obj1, obj2);

// 对象、函数、形参、返回可以这样用
function setName(obj) {
    obj.name = "gay"
    obj = new Object();
    obj.name = "les"
    return obj;
}
var person = new Object();
var person1 = setName(person);
console.log(person.name); //"gay"
console.log(person1.name); //"les"

// ES5用function实现链表
function Node(element) {
    this.element = element;
    this.next = null;
}
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.findPrevious = findPrevious;
    this.display = display;
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        print(currNode.next.element);
        currNode = currNode.next;
    }
}

function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) && (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
}
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();

// HashTable
function HashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.showDistro = showDistro;
    this.put = put;
    //this.get = get;
}
function put(data) {
    var pos = this.simpleHash(data);
    this.table[pos] = data;
}
function simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        total += data.charCodeAt(i);
    }
    return total % this.table.length;
}
function showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; ++i) {
        if (this.table[i] != undefined) {
            print(i + ": " + this.table[i]);
        }
    }
}