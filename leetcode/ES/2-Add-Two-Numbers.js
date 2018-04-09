// You are given two non-empty linked lists representing two non-negative integers. 
// The digits are stored in reverse order and each of their nodes contain a single digit. 
// Add the two numbers and return it as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */


function ListNode(val) {
    this.val = val;
    this.next = null;
}
var l1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 7,
            next: null
        }
    }
}
var l2 = {
    val: 1,
    next: {
        val: 8,
        next: {
            val: 3,
            next: null
        }
    }
}


// 20180408 update
// Your runtime beats 19.06 % of javascript submissions.
// 180ms
var addTwoNumbers1 = function(l1, l2) {
    // var ls=new ListNode();
    // // var i=1;
    // while(l1.next){
    //     if(l1.val+l2.val>=10){
    //         ls.val=(l1.val+l2.val)%10+ls.val;
    //         console.log(ls.val);
    //         ls.next=new ListNode();
    //         ls.next.val=1;
    //     }
    //     else if(l1.val+l2.val<10){
    //         ls.val=l1.val+l2.val;
    //         ls.next=new ListNode();
    //     }
    //     l1=l1.next;
    //     l2=l2.next;
    //     // console.log(i++);
    // }
    // return ls;
    var add = 0,
        ans, head;

    while (l1 || l2) {
        var a = l1 ? l1.val : 0,
            b = l2 ? l2.val : 0;

        var sum = a + b + add;
        add = ~~(sum / 10);

        var node = new ListNode(sum % 10);
        // console.log(ans);
        if (!ans)
            ans = head = node;
        else {
            head.next = node;
            head = node;
        }

        if (l1)
            l1 = l1.next;
        if (l2)
            l2 = l2.next;
    }

    if (add) {
        var node = new ListNode(add);
        head.next = node;
        head = node;
    }

    return ans;
};


// 112ms
var addTwoNumbers = function(l1, l2) {
    let flag = 0;
    let head = null,
        temp = null;
    while (l1 || l2) {
        // 计算求和并移动节点
        let sum = flag;
        if (l1) {
            sum = sum + l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum = sum + l2.val;
            l2 = l2.next;
        }
        // 储存结果
        let obj = new ListNode(sum % 10);
        console.log(obj);
        if (head === null) {
            head = obj;
            // console.log(head);
            temp = obj;
            // console.log(temp);
        } else {
            temp.next = obj;
            // console.log(temp);
            temp = obj;
        }
        // obj.next = head;
        // head = obj;
        // 重置进位
        flag = 0;
        if (sum >= 10) {
            flag = 1;
        }
    }
    // console.log(1);
    if (flag === 1) {
        let obj = new ListNode(1);
        temp.next = obj;
        temp = obj;
        // console.log(temp);
    }
    // return temp;
    return head;
};

console.log(addTwoNumbers(l1, l2));