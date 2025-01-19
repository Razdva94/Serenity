import { Controller, Body, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { IExpression } from 'src/interfaces/operation.interface';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  calculate(@Body() expression: IExpression) {
    const result = this.calculatorService.startCalculator(
      expression.expression,
    );
    return { result: [String(result)], error: null };
  }
}
