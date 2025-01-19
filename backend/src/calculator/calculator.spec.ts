import { CalculatorService } from './calculator.service';
import { ExpressionParser } from './model/parser';
import addition from './model/operators/addition';
import substraction from './model/operators/substraction';
import multiplication from './model/operators/multiplication';
import division from './model/operators/division';
import { IOperation } from '../interfaces/operation.interface';
import exponentiation from './model/operators/exponentiation';

describe('Calculator', () => {
  let calculator: CalculatorService;

  beforeEach(() => {
    const parser = new ExpressionParser();
    const operations = new Map<
      string,
      { operation: { priority: number; action: IOperation } }
    >();
    operations.set('+', { operation: { action: addition, priority: 1 } });
    operations.set('-', { operation: { action: substraction, priority: 1 } });
    operations.set('*', {
      operation: { action: multiplication, priority: 2 },
    });
    operations.set('/', { operation: { action: division, priority: 2 } });
    operations.set('^', {
      operation: { action: exponentiation, priority: 3 },
    });

    calculator = new CalculatorService(parser, operations);
  });

  it('should correctly calculate addition', () => {
    const result = calculator.startCalculator('2 + 2');
    expect(result).toBe(4);
  });

  it('should correctly calculate subtraction', () => {
    const result = calculator.startCalculator('5 - 3');
    expect(result).toBe(2);
  });

  it('should correctly calculate multiplication', () => {
    const result = calculator.startCalculator('4 * 3');
    expect(result).toBe(12);
  });
  it('should correctly calculate exponentiation', () => {
    const result = calculator.startCalculator('2 ^ 3');
    expect(result).toBe(8);
  });

  it('should correctly calculate division', () => {
    const result = calculator.startCalculator('10 / 2');
    expect(result).toBe(5);
  });

  it('should correctly calculate expression with brackets', () => {
    const result = calculator.startCalculator('2 + (3 * 2)');
    expect(result).toBe(8);
  });
  it('should correctly calculate expression with brackets', () => {
    const result = calculator.startCalculator('- 2 - (3 * 2)');
    expect(result).toBe(-8);
  });

  it('should correctly calculate complex expression with nested brackets', () => {
    const result = calculator.startCalculator('2 + (3 * (2 + 1)) / 3');
    expect(result).toBe(5);
  });

  it('should throw an error for invalid input', () => {
    expect(() => calculator.startCalculator('2 + (3 *')).toThrow(
      'Ошибка парсинга выражения: несбалансированные скобки',
    );
  });
  it('should throw an error for invalid input', () => {
    expect(() => calculator.startCalculator('*')).toThrow(
      'Ошибка: введены некорректные данные',
    );
  });
});
