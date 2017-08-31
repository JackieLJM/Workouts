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

function ListNode(val){
    this.val=val;
    this.next=null;
}
var l1={
    val:1,
    next:{
        val:2,
        next:{
            val:3,
            next:null
        }
    }
}
var l2={
    val:1,
    next:{
        val:8,
        next:{
            val:3,
            next:null
        }
    }
}

var addTwoNumbers = function(l1, l2) {
    var ls=new ListNode();
    // var i=1;
    while(l1.next){
        if(l1.val+l2.val>=10){
            ls.val=(l1.val+l2.val)%10+ls.val;
            console.log(ls.val);
            ls.next=new ListNode();
            ls.next.val=1;
        }
        else if(l1.val+l2.val<10){
            ls.val=l1.val+l2.val;
            ls.next=new ListNode();
        }
        l1=l1.next;
        l2=l2.next;
        // console.log(i++);
    }
    return ls;
};
console.log(addTwoNumbers(l1,l2));
console.log(l1);
