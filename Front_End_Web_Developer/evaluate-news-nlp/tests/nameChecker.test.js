import { checkForName } from '../src/client/js/nameChecker'

describe('url class or test class',()=>{
    test('should return enpty class',()=>{
        let result = checkForName('')
        expect(result).toEqual({})
    })
    test('should return text class',()=>{
        let result = checkForName('John is a very good football player!')
        expect(result).toEqual({'text':'John is a very good football player!'})
    })
    test('should return url class',()=>{
        let result = checkForName('https://www.nytimes.com')
        expect(result).toEqual({'url':'https://www.nytimes.com'})
    })
})