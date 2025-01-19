import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { ExpressionParser } from './model/parser';
import { IOperation, OperationMap } from '../interfaces/operation.interface';
import addition from './model/operators/addition';
import substraction from './model/operators/substraction';
import multiplication from './model/operators/multiplication';
import division from './model/operators/division';
import exponentiation from './model/operators/exponentiation';

@Module({
  providers: [
    CalculatorService,
    ExpressionParser,
    {
      provide: 'OPERATIONS_MAP',
      useValue: createOperations(),
    },
  ],
  controllers: [CalculatorController],
})
export class CalculatorModule {}

function createOperations(): OperationMap {
  const operations = new Map<
    string,
    { operation: { priority: number; action: IOperation } }
  >();
  operations.set('+', { operation: { action: addition, priority: 1 } });
  operations.set('-', {
    operation: { action: substraction, priority: 1 },
  });
  operations.set('*', {
    operation: { action: multiplication, priority: 2 },
  });
  operations.set('/', {
    operation: { action: division, priority: 2 },
  });
  operations.set('^', {
    operation: { action: exponentiation, priority: 3 },
  });
  return operations;
}
