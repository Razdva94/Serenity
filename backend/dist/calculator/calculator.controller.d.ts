import { CalculatorService } from './calculator.service';
import { IExpression } from 'src/interfaces/operation.interface';
export declare class CalculatorController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
    calculate(expression: IExpression): {
        result: string[];
        error: any;
    };
}
