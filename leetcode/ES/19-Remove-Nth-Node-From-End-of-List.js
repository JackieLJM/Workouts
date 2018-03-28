/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var head={ val: 1, next:{ val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: { val: 6, next: null } } } } } };
var removeNthFromEnd = function(head, n) {
    // console.log(head);
    var i=1,
    headd=head,
    headdd=head;
    while(headd.next!==null){
        headd=headd.next;
        i++;
        console.log(headd);
    }
    // for(let j=0;j<i-n;j++){
    //     headdd=headdd.next;
    //     console.log(headdd);
    // }
    // console.log(head);
};
console.log(removeNthFromEnd(head));