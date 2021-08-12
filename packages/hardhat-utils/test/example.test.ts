import { expect } from 'earljs'

import { something } from '../src'

describe('test', () => {
  it('works', () => {
    expect(something).not.toEqual(1)
  })
})
