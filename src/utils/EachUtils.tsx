import { Children, ReactNode } from "react";

interface EachUtilsProps<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}

export default function EachUtils<T>({ of, render }: EachUtilsProps<T>) {
  return <>{Children.toArray(of.map((item, index) => render(item, index)))}</>;
}
