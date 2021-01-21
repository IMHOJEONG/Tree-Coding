## lodash

https://lodash.com/

## FP Guide

- https://github.com/lodash/lodash/wiki/FP-Guide

### Mapping 

- 불변의 자동 커리되고 반복자 우선, 데이터 낮은 우선순위 이지만 그것은 각 메소드에 대해 실제로 무슨 의미를 가지는가?
    
- 제한 반복 인수

    - 반복 인수는 가변 반복으로 인한 문제를 피하기 위해 제한된다.

    - lodash/map 반복자는 3가지의 인수를 받는다. => vale, index|key, collection

    ```javascript
    _.map(['6', '8', '10'], parseInt); // [6, NaN, 2]
    ```

    - lodash/fp/map 반복자는 1개의 인수를 받는다. 
    ```javascript
    fp.map(parseInt)(['6','8','10']); // [6, 8, 10]
    ```

    - 한 개의 인수를 받는 반복자로 제한하는 메소드 
        - dropRightWhile, dropWhile, every, filter, find, findFrom, findIndex, findIndexFrom, findKey, findLast, findLastFrom, findLastIndex, findLastIndexFrom, findLastKey, flatMap, flatMapDeep, flatMapDepth, forEach, forEachRight, forIn, forInRight, forOwn, forOwnRight, map, mapKeys, mapValues, partition, reject, remove, some, takeRightWhile, takeWhile, & times

    - 2 개의 인수로 제한하는 메소드 
        - reduce, reduceRight, & transform
    
    - 한 개의 인수로 제한하는 mapKeys의 반복자 : (key)

- 고정된 Arities
    - 메소드들은 자동 커링을 지원하는 고정되는 arities가 있다. 

    - lodash/padStart는 선택적인 chars 매개변수를 받는다.
    ```javascript
    _.padStart('a', 3, '-') // '--a'
    ```

    - lodash/fp/padStart는 그렇지 않다. 
    ```javascript
    fp.padStart(3)('a'); // '  a'
    fp.padCharsStart('-')(3)('a'); // '--a'
    ```

    - https://github.com/lodash/lodash/wiki/FP-Guide#fixed-arity

- 선택적 인자를 지원하지 않음 

    - 선택적 인자는 자동 커링된 메서드들에 지원되지 않음 

    - lodash/sortBy는 선택적인 반복자 매개변수를 받음 
    ```javascript
    _.sortBy([3, 1, 2]) // [1, 2, 3]
    _.sortBy([{ name: 'moss'}, { name: 'jen' }, { name: 'roy'}], name)
    // [{ name: 'jen'}, { name: 'moss'}, { name: 'roy'}]
    ```

    - lodash/fp/sortBy는 반복자 매개변수를 명시적으로 주어야 하는 것을 요구한다. 
    ```javascript
    fp.sortBy(_.identity)([3, 1, 2]); // [1, 2, 3] 
    fp.sortBy('name')([{ name: 'moss'}, { name: 'jen' }, { name: 'roy'}])
    // [{ name: 'jen'}, { name: 'moss'}, { name: 'roy'}]
    ```

- 재배열되는 인자들

    - 메소드 매개변수는 composition을 쉽게 하도록 재구성된다.

    - lodash/filter는 데이터 우선, 반복자 나중이다.
        - collection, iteratee
    ```javascript
    var compact = _.partial(_.filter, _, Boolean);
    compact(['a', null, c]) // ['a', 'c']
    ```

    - lodash/fp/filter는 반복자 우선, 데이터 나중이다.
        - iteratee, collection
    ```javascript
    var compact = fp.filter(Boolean);
    compact(['a', null, 'c']); // ['a', 'c']
    ```

    - https://github.com/lodash/lodash/wiki/FP-Guide#most-methods-follow-these-rules

    - https://github.com/lodash/lodash/wiki/FP-Guide#exceptions-to-the-rules


- https://github.com/lodash/lodash/wiki/FP-Guide#new-methods

## 자리 표시자(placeholders)

- 자리 표시자 매개변수는 디폴트로 _로 표시한다. 다른 순서로 메소드 매개변수를 채우는 데 사용될 수 있다.
    - 자리 표시자들은 커링된 반환 함수의 첫 번째 이용가능한 매개변수로 채워집니다.

    ```javascript
    // 2 > 5 라는 식과 동일 
    _.gt(2)(5); // false

    // _.gt(5,2) 또는 5 > 2와 동일 
    _.gt(_, 2)(5); // true
    ```

## 체이닝 

- lodash/fp 모듈은 체인 연속 메소드로 변환할 수 없다. 
    - 메소드 체이닝의 대안으로 함수형 구성을 사용할 수 있다는데?
        - https://medium.com/bootstart/why-using-chain-is-a-mistake-9bc1f80d51ba

## 전환

- 비록 lodash/fp와 그 메소드 모듈들이 사전 변환되지만, 변환을 사용자 정의할 수도 있음 
    - 그 때 전환 메소드가 유용하게 사용됨
    ```javascript
    // 모든 옵션은 기본적으로 true
    var _fp = fp.convert({
        // 반복자 매개변수의 제한을 특정
        'cap' : true,

        // 커링을 지정함 
        'curry' : true,

        // 고정 arity를 지정
        'fixed' : true,

        // 불변 연산을 지정
        'immutable' : true,

        //  재배열 인수들을 지정 
        'rearg' : true
    });

    // convert 메서드는 각 메소드에 이용 가능하다 

    var mapValuesWithKey = fp.mapValues.convert({ 'cap' : false })

    // key 매개변수에 접근하기 위해 반복자 매개변수 제한을 무력화하는 예
    mapValuesWithKey(function(value, key){
        return key == 'a' ? -1 : value;
    })({ 'a' : 1, 'b': 1});
    // { 'a' : 1, 'b': 1}
    ```
- convert 모듈에서도 수동 변환이 가능하다 

```javascript
var convert = require('lodash/fp/convert');


// name에 의한 convert
var assign = convert('assign', require('lodash.assign'))

// Object에 의한 convert
var fp = convert({
    'assign' : require('lodash.assign'),
    'chunk': require('lodash.chunk')
})

// lodash 객체에 의한 convert
var fp = convert(lodash.runInContext());

```




    

### Lodash Example 

- https://codeburst.io/examples-in-javascript-functional-programming-part-1-c9e2df8a411a

```javascript
const map = require('lodash/map');
const fpMap = require('lodash/fp/map');

const myArray = [1,2,3];
const myFunction = x => x * 2;

// lodash 전통적인 방법 
console.log(map(myArray, myFunction)); // [2, 4, 6]

// lodash 함수형 프로그래밍 
console.log(fpMap(myFunction)(myArray)); // [2, 4, 6]
```
- 관찰 

    - 자동 커링된다는 것은 각 함수 호출이 단일 인수만 허용하도록 함수 형식이 구조화되어 있다.
        - 여러 호출을 수행하여 작업을 수행할 수 있음 

    - Iteratee-first는 먼저 사용되는 함수를 의미한다. 
        - myFunction

    - Data-last는 나중에 사용되는 데이터를 의미 ->  myArray

    - Erics와 다른 문서에 따르면 => Lodash에 의한 유용한 함수형 프로그래밍 도구들 중 하나는 함수 composition을 위해 사용됨 
        - 까다로운 점은 다양한 변형이 존재한다는 것 

    - _.flow([funcs]) 
        - 생성된 함수의 this 바인딩을 사용해 주어진 함수를 호출한 결과를 반환하는 함수를 만든다.
        - 각 연속 호출에는 이전의 반환 값이 제공됨 
    - _.flowRight([funcs])
        - 오른쪽에서 왼쪽으로 주어진 함수를 호출하는 함수를 생성하는 점만 위의 _.flow와 같음 
    - _.pipe : _.flow의 별칭
    - _.compose : _.flowRight의 별칭

    ```javascript
    const pipe = require('lodash/fp/pipe');
    const compose = require('lodash/fp/compose');

    const myArray = [1, 2, 3];
    const myFunction = x => x * 2;
    const myFunction2 = x => x + 1;

    // 함수 호출을 left=>right로 이동 
    console.log(pipe([myFunction, myFunction2])(2)); 
    // (2 * 2) + 1 = 5

    console.log(compose([myFunction, myFunnction2])(2)); 
    // (2+1) * 2 = 6

    ```
    - 관찰 

        - pipe라는 용어는 Unix pipe 용어에서 빌려옴 
            - 왼쪽에서 오른쪽으로!
        - compose라는 용어는 수학에서 나옴 => f와 g의 합성은 f(g(x))를 의미
            - 오른쪽에서 왼쪽으로
    

