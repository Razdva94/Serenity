import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OperationMap } from '../interfaces/operation.interface';
import { ExpressionParser } from './model/parser';

@Injectable()
export class CalculatorService {
  private parser: ExpressionParser;
  private operations: OperationMap;

  constructor(
    parser: ExpressionParser,
    @Inject('OPERATIONS_MAP') operations: OperationMap,
  ) {
    this.parser = parser;
    this.operations = operations;
  }

  public startCalculator(expression: string): number | void {
    const calculator = new CalculatorService(this.parser, this.operations);
    const result = calculator.calculate(expression);
    return result;
  }

  private calculate(expression: string): number | void {
    const tokens = this.parser.parse(expression);
    const result = this.processBrackets(tokens);
    return result;
  }

  private processBrackets(tokens: string[]): number {
    while (tokens.includes('(')) {
      const closeIndex = tokens.indexOf(')');
      let openIndex = closeIndex;
      while (openIndex >= 0 && tokens[openIndex] !== '(') {
        openIndex--;
      }

      if (openIndex < 0) {
        throw new BadRequestException(
          'Ошибка парсинга выражения: несбалансированные скобки3',
        );
      }
      const innerTokens = tokens.slice(openIndex + 1, closeIndex);
      const result = this.findResult(innerTokens);
      tokens.splice(openIndex, closeIndex - openIndex + 1, result.toString());
    }
    const result = this.findResult(tokens);
    return result;
  }

  private findResult(tokens: string[]) {
    if (tokens.length === 1) return Number(tokens[0]);
    this.handleUnaryMinus(tokens);
    const maxPriority = this.findMaxPriority(tokens);
    const finalTokens = this.searchCycle(tokens, maxPriority);
    if (finalTokens.includes('(') || finalTokens.includes(')')) {
      throw new BadRequestException(
        'Ошибка парсинга выражения: несбалансированные скобки1',
      );
    }
    if (finalTokens.length !== 1) {
      throw new BadRequestException(
        'Ошибка парсинга выражения: несбалансированные скобки2',
      );
    }
    const result = Number(finalTokens[0]);
    return result;
  }

  private findPriority(operator: string) {
    return this.operations.get(operator)?.operation.priority || null;
  }

  private findMaxPriority(tokens: string[]) {
    const priorityArr: number[] = [];
    tokens.forEach((token) => {
      if (this.operations.has(token)) {
        const priority = this.findPriority(token);
        priorityArr.push(priority);
      }
    });
    const maxPriority = Math.max(...priorityArr);
    return maxPriority;
  }

  private handleUnaryMinus(tokens: string[]) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '-' && (i === 0 || tokens[i - 1] === '(')) {
        const number = Number(tokens[i + 1]);
        if (!isNaN(number)) {
          tokens.splice(i, 2, (-number).toString());
        } else {
          throw new BadRequestException('Введены некорректные данные');
        }
      }
    }
  }

  private searchCycle(tokens: string[], maxPriority: number) {
    if (maxPriority === 0) {
      return tokens;
    }
    for (let i = 0; i < tokens.length; i++) {
      if (this.operations.get(tokens[i])?.operation.priority === maxPriority) {
        const firstOperand = Number(tokens[i - 1]);
        const secondOperand = Number(tokens[i + 1]);
        const operator = tokens[i];
        if (isNaN(firstOperand) || isNaN(secondOperand)) {
          throw new BadRequestException('Введены некорректные данные');
        }
        const result = this.calculateOperation(
          firstOperand,
          secondOperand,
          operator,
        );
        tokens.splice(i - 1, 3, result.toString());
        i = 0;
      }
    }
    return this.searchCycle(tokens, maxPriority - 1);
  }

  private calculateOperation(
    firstOperand: number,
    secondOperand: number,
    operator: string,
  ) {
    const operation = this.operations.get(operator).operation;
    if (!operation) {
      throw new BadRequestException('Введены некорректные данные');
    }
    return operation.action.execute(firstOperand, secondOperand);
  }
}
