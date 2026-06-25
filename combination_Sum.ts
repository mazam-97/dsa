function combination_sum(candidates: number[], target: number) {

  let outputs: number[][] = [];

  backtrack(0, [], 0);
  return outputs;
  function backtrack(index: number, currentSet: number[], sum: number) {

    if (sum === target) {
      outputs.push([...currentSet]);
      return;

    }
    if (index >= candidates.length || sum > target) {
      return;
    }

    currentSet.push(candidates[index] as number);

    backtrack(index, currentSet, sum + candidates[index as any] as any);

    currentSet.pop();

    backtrack(index + 1, currentSet, sum);

    return;




  }

}

console.log(combination_sum([2, 3, 4, 5], 8));


