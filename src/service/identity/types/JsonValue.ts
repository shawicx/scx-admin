/**
 * @description 任意 JSON 值（对象/数组/标量/null 皆可，递归）
 */
export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
