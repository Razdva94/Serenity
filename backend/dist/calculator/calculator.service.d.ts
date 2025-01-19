import { OperationMap } from '../interfaces/operation.interface';
import { ExpressionParser } from './model/parser';
export declare class CalculatorService {
    private parser;
    private operations;
    constructor(parser: ExpressionParser, operations: OperationMap);
    startCalculator(expression: string): number | void;
    private calculate;
    private processBrackets;
    private findResult;
    private findPriority;
    private findMaxPriority;
    private handleUnaryMinus;
    private searchCycle;
    private calculateOperation;
}
