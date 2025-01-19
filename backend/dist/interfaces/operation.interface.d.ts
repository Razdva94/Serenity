export interface IOperation {
    execute(a: number, b: number): number;
}
export type OperationMap = Map<string, {
    operation: {
        priority: number;
        action: IOperation;
    };
}>;
export interface IExpression {
    expression: string;
}
