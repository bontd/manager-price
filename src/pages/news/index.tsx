
const News = () => {

    function processArray(arr: any[]): any[] {
        let res = arr.slice();
        let n = res.length;
        let changed = true;

        function isValidNull(idx: number) {
            return res[idx] === null;
        }

        function isAdjacent(idx: number, groupStart: number, groupEnd: number) {
            // Kiểm tra null idx có liền kề với nhóm số (trước hoặc sau)
            return idx === groupStart - 1 || idx === groupEnd;
        }

        function isValidNullForSingle(idx: number) {
            // Đẩy số lẻ: chỉ cần null là null
            return res[idx] === null;
        }

        function findContiguousNullsBeforeGroup(groupStart: number, groupCount: number): number[] | null {
            // Tìm dải null liền kề phía trước nhóm, đủ số lượng groupCount
            let start = groupStart - groupCount;
            if (start < 0) return null;
            for (let i = 0; i < groupCount; i++) {
                if (!isValidNull(start + i)) return null;
            }
            return Array.from({length: groupCount}, (_, k) => start + k);
        }

        while (changed) {
            changed = false;
            let i = 0;
            while (i < n) {
                // Tìm null đầu tiên
                if (res[i] === null) {
                    // Đếm số lượng null liên tiếp
                    let nullStart = i;
                    while (i < n && res[i] === null) i++;
                    let nullEnd = i; // exclusive
                    let nullCount = nullEnd - nullStart;

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
                    let groupEnd = groupStart + groupCount; // exclusive

                    if (groupCount === 1) {
                        // Đẩy số lẻ lên null đầu tiên hợp lệ (chỉ cần null là null)
                        for (let k = 0; k < nullCount; k++) {
                            if (isValidNullForSingle(nullStart + k)) {
                                res[nullStart + k] = value;
                                res[groupStart] = null;
                                changed = true;
                                break;
                            }
                        }
                    } else {
                        // Ưu tiên kiểm tra có dải null liền kề phía trước nhóm đủ số lượng không
                        let contiguousNulls = findContiguousNullsBeforeGroup(groupStart, groupCount);
                        if (contiguousNulls) {
                            for (let k = 0; k < groupCount; k++) {
                                res[contiguousNulls[k]] = value;
                                res[groupStart + k] = null;
                            }
                            changed = true;
                        } else {
                            // Nếu không đủ, chỉ đẩy vào null liền kề với nhóm như hiện tại
                            let validNulls = [];
                            for (let idx = nullStart; idx < nullEnd; idx++) {
                                if (isValidNull(idx) && isAdjacent(idx, groupStart, groupEnd)) {
                                    validNulls.push(idx);
                                }
                            }
                            let moveCount = Math.min(validNulls.length, groupCount);
                            if (moveCount > 0) {
                                for (let k = 0; k < moveCount; k++) {
                                    res[validNulls[k]] = value;
                                    res[groupStart + k] = null;
                                }
                                changed = true;
                            }
                        }
                        // Các số còn lại của nhóm giữ nguyên vị trí cũ
                    }
                    // Tiếp tục duyệt từ sau đoạn null vừa xử lý
                    i = nullEnd;
                } else {
                    i++;
                }
            }
        }
        return res;
    }
      
    // Test
    const arr = [1, 1, null, null, 2, 'none', 2, 'a', 'a', 4, 5, 5, 6, null, null, 'a', null, 7, 7, 7, null, 'none', 'none', null];
    
    console.log(processArray(arr));
    // Output: [1, 1, 2, 2, 4, 'none', null, 'a', 'a', 5, 5, 6, null]
        
    return (
        <>
            New
        </>
    )
}

export default News;