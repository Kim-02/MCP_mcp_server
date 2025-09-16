// src/controller.js

// 1. 필요한 파일과 서비스들을 불러옵니다.
const toolsList = require('../config/tools.json');
const echoService = require('./services/echo');
const simpleCalculatorService = require('./services/simpleCalculator');
const getCurrentTimeService = require('./services/getCurrentTime');

// 2. 각 도구 이름과 실제 함수를 짝지어 둡니다 (호출하기 쉽게).
const services = {
    echo: echoService,
    simpleCalculator: simpleCalculatorService,
    getCurrentTime: getCurrentTimeService,
};

// 3. 요청을 처리하는 메인 함수
exports.handleRequest = async (req, res) => {
    const { id, method, params } = req.body;

    // `tools/list` 요청 처리
    if (method === 'tools/list') {
        return res.json({ jsonrpc: "2.0", id, result: toolsList });
    }

    // `tools/call` 요청 처리
    if (method === 'tools/call') {
        const serviceName = params.name; // 실행할 도구 이름
        const serviceToRun = services[serviceName]; // 이름에 맞는 함수 찾기

        if (serviceToRun) {
            try {
                const result = await serviceToRun(params.arguments); // 도구 실행

                // 성공 응답 전송
                return res.json({
                    jsonrpc: "2.0",
                    id,
                    result: { content: [{ type: "text", text: result }], isError: false },
                });
            } catch (error) {
                // 도중 에러 발생 시 오류 응답 전송
                return res.status(500).json({
                    jsonrpc: "2.0",
                    id,
                    error: { code: -32603, message: error.message },
                });
            }
        }
    }

    // 그 외의 요청은 오류 처리
    return res.status(400).json({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: "Method not found" },
    });
};