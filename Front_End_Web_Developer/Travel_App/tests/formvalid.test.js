import { datevalidation } from '../src/client/js/formvalid'

describe('Date validity check',()=>{
    test('should return false',()=>{
        let result = datevalidation("05/13/2020")
        expect(result).toBe(false)
    })
    test('should retrun fasle',()=>{
        let result = datevalidation("31/06/2020")
        expect(result).toBe(false)
    })
    test('should return ture',()=>{
        let result = datevalidation("01/06/2020")
        expect(result).toBe(true)
    })
})