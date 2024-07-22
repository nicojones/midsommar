export interface IValueLabel<ValueType extends string | number = string> {
  value: ValueType;
  label: string;
  icon: string;
  description?: string;
}
