/**
 * Joins truthy class names: cx('a', cond && 'b', undefined) → 'a b'
 * @param {...(string | false | null | undefined | 0)} classes
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
