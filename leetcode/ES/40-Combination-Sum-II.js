/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
	candidates.sort((a,b)=>(a-b>0));
	console.log(candidates);
	var arr_l=[],arr_ll=[];
	dfs(candidates, arr_l, arr_ll, target, 0);
	return arr_ll;
};
function dfs(nums,arr_l,arr_ll,gap,start){
	// 当差值等于零的时候就生成一个对应数组，然后把它推进二维数组
	if(gap==0){
		return arr_ll.push(arr_l);
	}
	var previous =-1;
	for (let i = start; i < nums.length; i++) {
            
            if (previous == nums[i]) continue;

            // 如果大于遍历到的元素大于差值，就返回终止遍历终止函数运行
            if (gap < nums[i]) return; 

            previous = nums[i];

            arr_l.push(nums[i]);
            console.log(gap);
            dfs(nums, arr_l, arr_ll, gap - nums[i], i + 1);
            arr_l.pop(); 
    }
}


console.log(combinationSum2([10,1,2,7,6,1,5],8));