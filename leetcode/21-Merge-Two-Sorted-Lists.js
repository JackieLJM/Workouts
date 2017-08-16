// Your runtime beats 84.07 % of javascript submissions.
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

var l1=new ListNode(2);
var l2=new ListNode(1);

var mergeTwoLists = function(l1, l2) {
    if(l1 == null){
            return l2;
    }
    if(l2 == null){
            return l1;
    }
    var mergeHead=new ListNode();
    if(l1.val < l2.val){
        mergeHead = l1;
        mergeHead.next = mergeTwoLists(l1.next, l2);
    }
    else{
        mergeHead = l2;
        mergeHead.next = mergeTwoLists(l1, l2.next);
    }
    return mergeHead;
};
console.log(mergeTwoLists(l1,l2));
