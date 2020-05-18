import { fetchData } from '../src/client/js/fetchData'
import {enableFetchMocks} from 'jest-fetch-mock'
enableFetchMocks()


describe('should match designated Object structure',()=>{
    beforeEach(()=>{
        fetch.resetMocks()
    })
    const matchObject = {
        'polarity':'',
        'subjectivity':'',
        'text':'',
        'polarity_confidence':0.001,
        'subjectivity_confidence':0.001
    }
    test('should return designated Object structure by text',()=>{
        fetch.mockResponseOnce(JSON.stringify(matchObject))
        return fetchData({'text':'John is a very good football player!'}).then(data=>{
            expect(data).toMatchObject(matchObject)
        })
    })
    test('should return designated Object structure by url',()=>{
        fetch.mockResponseOnce(JSON.stringify(matchObject))
        return fetchData({'url':'https://www.nytimes.com/2020/05/12/us/cal-state-online-classes.html?auth=link-dismiss-google1tap'}).then(data=>{
            expect(data).toMatchObject(matchObject)
        })
    })
})