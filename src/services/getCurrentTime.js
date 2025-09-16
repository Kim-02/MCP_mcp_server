module.exports = async (args) => {
    const now = new Date();
    return `현재 시간은 ${now.toLocaleString('ko-KR')} 입니다.`;
};