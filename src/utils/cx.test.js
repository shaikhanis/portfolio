import { describe, expect, it } from 'vitest'
import { cx } from './cx.js'

describe('cx', () => {
  it('joins truthy class names and skips falsy ones', () => {
    expect(cx('a', false, 'b', null, undefined, 0, 'c')).toBe('a b c')
  })
})
