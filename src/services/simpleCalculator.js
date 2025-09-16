module.exports = async (args) => {
    const { num1, num2, operator } = args;
    if (operator === '+') {
        return `결과는 ${num1 + num2} 입니다.`;
    } else if (operator === '*') {
        return `결과는 ${num1 * num2} 입니다.`;
    } else {
        throw new Error("잘못된 연산자입니다. '+' 또는 '*'만 사용 가능합니다.");
    }
};