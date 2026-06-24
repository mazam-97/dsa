const maxConones = (arr: number[]) => {

  let l = 0;
  let r = 0;
  let maxLen = 0;
  let n = arr.length;
  while (r < n) {

    while (r < n && arr[r] == 1) {
      r++;

    }

    maxLen = Math.max(maxLen, r - l);
    r++;
    l = r;



  }

  return maxLen;

}

const max_zro = (arr: number[], mx: number) => {
  let l = 0, r = 0, cz = 0, n = arr.length;
  let res = 0;
  while (r < n) {
    if (arr[r] != 0) {
      r++;
    } else {
      if (cz + 1 <= mx) {
        cz++;
        r++;
      } else {
        while (l <= r && arr[l] != 0) {
          l++;
        }
        l++;
        cz--;
      }
    }
    res = Math.max(res, r - l);
  }
  return res;
}

console.log(max_zro([1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], 2))
console.log(max_zro([1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], 1))
