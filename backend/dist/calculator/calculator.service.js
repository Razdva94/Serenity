"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CalculatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const parser_1 = require("./model/parser");
let CalculatorService = CalculatorService_1 = class CalculatorService {
    constructor(parser, operations) {
        this.parser = parser;
        this.operations = operations;
    }
    startCalculator(expression) {
        const calculator = new CalculatorService_1(this.parser, this.operations);
        const result = calculator.calculate(expression);
        return result;
    }
    calculate(expression) {
        const tokens = this.parser.parse(expression);
        const result = this.processBrackets(tokens);
        return result;
    }
    processBrackets(tokens) {
        while (tokens.includes('(')) {
            const closeIndex = tokens.indexOf(')');
            let openIndex = closeIndex;
            while (openIndex >= 0 && tokens[openIndex] !== '(') {
                openIndex--;
            }
            if (openIndex < 0) {
                throw new common_1.BadRequestException('Ошибка парсинга выражения: несбалансированные скобки3');
            }
            const innerTokens = tokens.slice(openIndex + 1, closeIndex);
            const result = this.findResult(innerTokens);
            tokens.splice(openIndex, closeIndex - openIndex + 1, result.toString());
        }
        const result = this.findResult(tokens);
        return result;
    }
    findResult(tokens) {
        if (tokens.length === 1)
            return Number(tokens[0]);
        this.handleUnaryMinus(tokens);
        const maxPriority = this.findMaxPriority(tokens);
        const finalTokens = this.searchCycle(tokens, maxPriority);
        if (finalTokens.includes('(') || finalTokens.includes(')')) {
            throw new common_1.BadRequestException('Ошибка парсинга выражения: несбалансированные скобки1');
        }
        if (finalTokens.length !== 1) {
            throw new common_1.BadRequestException('Ошибка парсинга выражения: несбалансированные скобки2');
        }
        const result = Number(finalTokens[0]);
        return result;
    }
    findPriority(operator) {
        return this.operations.get(operator)?.operation.priority || null;
    }
    findMaxPriority(tokens) {
        const priorityArr = [];
        tokens.forEach((token) => {
            if (this.operations.has(token)) {
                const priority = this.findPriority(token);
                priorityArr.push(priority);
            }
        });
        const maxPriority = Math.max(...priorityArr);
        return maxPriority;
    }
    handleUnaryMinus(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === '-' && (i === 0 || tokens[i - 1] === '(')) {
                const number = Number(tokens[i + 1]);
                if (!isNaN(number)) {
                    tokens.splice(i, 2, (-number).toString());
                }
                else {
                    throw new common_1.BadRequestException('Введены некорректные данные');
                }
            }
        }
    }
    searchCycle(tokens, maxPriority) {
        if (maxPriority === 0) {
            return tokens;
        }
        for (let i = 0; i < tokens.length; i++) {
            if (this.operations.get(tokens[i])?.operation.priority === maxPriority) {
                const firstOperand = Number(tokens[i - 1]);
                const secondOperand = Number(tokens[i + 1]);
                const operator = tokens[i];
                if (isNaN(firstOperand) || isNaN(secondOperand)) {
                    throw new common_1.BadRequestException('Введены некорректные данные');
                }
                const result = this.calculateOperation(firstOperand, secondOperand, operator);
                tokens.splice(i - 1, 3, result.toString());
                i = 0;
            }
        }
        return this.searchCycle(tokens, maxPriority - 1);
    }
    calculateOperation(firstOperand, secondOperand, operator) {
        const operation = this.operations.get(operator).operation;
        if (!operation) {
            throw new common_1.BadRequestException('Введены некорректные данные');
        }
        return operation.action.execute(firstOperand, secondOperand);
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = CalculatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('OPERATIONS_MAP')),
    __metadata("design:paramtypes", [parser_1.ExpressionParser, Object])
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map