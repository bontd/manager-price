
const News = () => {

    function processArray(arr: any[]): any[] {
        let res = arr.slice();
        let n = res.length;
        let changed = true;

        while (changed) {
            changed = false;
            let i = 0;
            while (i < n) {
                // Tìm null đầu tiên
                if (res[i] === null) {
                    // Đếm số lượng null liên tiếp
                    let nullStart = i;
                    while (i < n && res[i] === null) i++;
                    let nullCount = i - nullStart;

                    // Tìm số tiếp theo (bỏ qua các phần tử không phải số)
                    let j = i;
                    while (j < n && typeof res[j] !== 'number') j++;
                    if (j === n) break;

                    // Đếm nhóm số giống nhau liên tiếp (thực sự liên tiếp)
                    let value = res[j];
                    let groupStart = j;
                    let groupCount = 1;
                    j++;
                    while (j < n && res[j] === value && typeof res[j] === 'number') {
                        groupCount++;
                        j++;
                    }

                    // Kiểm tra xem có thể đẩy số lên null không
                    let canPush = true;
                    if (groupCount > 1 && nullCount < groupCount) {
                        // Không đủ null cho nhóm, kiểm tra xem có thể đẩy từng số lẻ lên null không
                        let lookahead = j;
                        while (lookahead < n && typeof res[lookahead] !== 'number') lookahead++;
                        if (lookahead < n && typeof res[lookahead] === 'number') {
                            let nextValue = res[lookahead];
                            let nextGroupCount = 1;
                            lookahead++;
                            while (lookahead < n && res[lookahead] === nextValue && typeof res[lookahead] === 'number') {
                                nextGroupCount++;
                                lookahead++;
                            }
                            if (nullCount < nextGroupCount) {
                                canPush = false;
                            }
                        }
                    }

                    if (canPush) {
                        if (groupCount === 1) {
                            // Đẩy số lẻ lên null đầu tiên
                            res[nullStart] = value;
                            res[groupStart] = null;
                            changed = true;
                        } else if (groupCount > 1 && nullCount >= groupCount) {
                            // Đủ null để đẩy cả nhóm lên
                            for (let k = 0; k < groupCount; k++) {
                                res[nullStart + k] = value;
                                res[groupStart + k] = null;
                            }
                            changed = true;
                        } else if (groupCount > 1 && nullCount < groupCount) {
                            // Không đủ null cho nhóm, nhưng có thể đẩy từng số lẻ lên null nếu không bị cản trở
                            let nullIdx = nullStart;
                            for (let k = 0; k < Math.min(nullCount, groupCount); k++) {
                                res[nullIdx] = value;
                                res[groupStart + k] = null;
                                nullIdx++;
                            }
                            changed = true;
                        }
                    }
                    // Tiếp tục duyệt từ sau đoạn null vừa xử lý
                    i = nullStart + nullCount;
                } else {
                    i++;
                }
            }
        }
        return res;
    }
      
    // Test
    const arr = [1, 1, null, null, 2, 'none', 2, 'a', 'a', 4, 5, 5, 6];
    
    console.log(processArray(arr));
    // Output: [1, 1, 2, 2, 4, 'none', null, 'a', 'a', 5, 5, 6, null]
        
    return (
        <>
            New
        </>
    )
}

export default News;