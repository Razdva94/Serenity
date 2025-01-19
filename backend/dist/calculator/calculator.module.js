"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorModule = void 0;
const common_1 = require("@nestjs/common");
const calculator_service_1 = require("./calculator.service");
const calculator_controller_1 = require("./calculator.controller");
const parser_1 = require("./model/parser");
const addition_1 = require("./model/operators/addition");
const substraction_1 = require("./model/operators/substraction");
const multiplication_1 = require("./model/operators/multiplication");
const division_1 = require("./model/operators/division");
const exponentiation_1 = require("./model/operators/exponentiation");
let CalculatorModule = class CalculatorModule {
};
exports.CalculatorModule = CalculatorModule;
exports.CalculatorModule = CalculatorModule = __decorate([
    (0, common_1.Module)({
        providers: [
            calculator_service_1.CalculatorService,
            parser_1.ExpressionParser,
            {
                provide: 'OPERATIONS_MAP',
                useValue: createOperations(),
            },
        ],
        controllers: [calculator_controller_1.CalculatorController],
    })
], CalculatorModule);
function createOperations() {
    const operations = new Map();
    operations.set('+', { operation: { action: addition_1.default, priority: 1 } });
    operations.set('-', {
        operation: { action: substraction_1.default, priority: 1 },
    });
    operations.set('*', {
        operation: { action: multiplication_1.default, priority: 2 },
    });
    operations.set('/', {
        operation: { action: division_1.default, priority: 2 },
    });
    operations.set('^', {
        operation: { action: exponentiation_1.default, priority: 3 },
    });
    return operations;
}
//# sourceMappingURL=calculator.module.js.map