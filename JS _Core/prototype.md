## prototype 

- https://medium.com/@madasamy/15-javascript-concepts-that-every-nodejs-programmer-must-to-know-6894f5157cb7

- 위 자료를 번역해서 이해하고자 작성하였습니다.

```javascript
function Bike(model, color){
    this.model = model,
    this.color = color,
    
    this.getDetails = function(){
        return this.model + 'bike is ' + this.color;
    }
}

let bikeObj1 = new Bike('BMW', 'BLACK');
let bikeObj2 = new Bike('BMW', 'WHITE');

console.log(bikeObj1.getDetails())
console.log(bikeObj2.getDetails())

```

- 자바스크립트에서 객체를 만드는 한 가지 
    - constructor 함수를 사용
    - 위의 예시, 2개의 객체는 생성자 함수인 getDetails()를 가지는 2개의 인스턴스를 가짐 
    - 같은 일을 하는 getDetails의 복사본을 가져야 하는 이유는??

- 객체의 복사본을 사용하는 대신 constructor 함수의 prototype 프로퍼티를 사용하자 

### prototype

- JS에서 객체를 만들 때, JS 엔진은 __proto__  프로퍼티(dunder proto) 새롭게 만들어지는 객체에 추가한다.

- dunder proto 또는 __proto__ 는 constructor 객체에 프로토타입 객체를 가리킴

```javascript
function Bike(model, color){
    this.model = model, 
    this.color = color
}

Bike.prototype.getDetails = function(){
    return this.model + " bike is " + this.color;
}

let bikeObj1 = new Bike('BMW', 'Black');

console.log(bikeObj1.getDetails());
```

- Bike 생성자 함수를 사용해서 만들어지는 bikeObj1 객체는 constructor 함수 Bike의 prototype 객체를 가리키는 dunder proto 또는 __proto__ 프로퍼티를 가집니다.

- bikeObj1의 dunder proto 또는 __proto__ 프로퍼티와 Bike.prototype 프로퍼티는 동등하다.

```javascript
console.log(bikeObj1.__proto__ === Bike.prototype);
```

 ## JS Class

 - ES6에서 도입된 JS 클래스는 JS에 존재하는 프로포타입 상속위의 문법적 설탕(syntatical sugar)

 - 클래스 문법은 JS에 새로운 객체지향 상속 모델에 도입하지 않았다.

 ```javascript
function Bike(model, color){
    this.model = model;
    this.color = color;
}

Bike.prototype.getInfo = function(){
    return this.color + ' ' + this.model + ' bike';
};
 ```

 - 클래스를 정의 :

    - 클래스는 사실 특별한 함수이다. 함수 선언과 표현을 정의할 수 있다
    - 클래스 문법은 2개의 컴포넌트를 가진다
        - 클래스 표현과 선언

```javascript
class Bike{
    constructor(color, model){
        this.color = color;
        this.model = model;
    }
}
```

### 클래스를 사용하면서 얻는 장점 

- 편하고 자기 포함적인 문법?

- JS에서 클래스들을 모방할 수 있는 유일하고 정식 방법
    - ES6 이전에는 유명한 라이브러리들에 각자 다른 경쟁적인 구현 방식들이 존재했엇다

- 클래스 기반 언어 배경을 가진 사람들에게 더 익숙하다.


## IIFE

- IIFE : 즉시 호출 함수 표현식입니다. 정의되자마자 실행되는 JS 함수입니다.

```javascript
(function (){
    // logic here
})();
```
- 첫 만남은 꽤 혼란스러워 보이지만, 사실 패턴은 간단하다 
- 즉시 호출되는 함수 표현식이다. 

- JS 함수는 함수 선언 또는 함수 표현을 통해 만들어진다. 
- 함수 선언은 이름이 있는 함수를 만드는 일반적인 방법이다. 

- 표현식 내 문맥에 의해 만들어지는 함수도 함수 표현식이다.
- 중요한 부분은 JS 표현식들은 값을 반환한다는 것이다.

- 위의 경우들 모두 표현식의 반환값은 함수이다. 

- 함수 표현식을 즉시 호출하려면 끝에 두 개의 괄호를 붙여야한다. 

```javascript
(function(){
    let foo = "hello";
    console.log(foo);
})();
console.log(foo); // Error : foo is not defined
```
- IIFE를 사용하는 주된 이유는 데이터 보안성을 얻기 위함이다. 

- JS의 var는 변수를 포함하는 함수로 범위를 지정하므로, IIFE 안에 선언된 변수들은 외부 범위에 접근할 수 없기 때문이다. 

## 스코프에 대한 이해 

- JS의 스코프에 대한 간단한 정의 

- 스코프는 런타임 동안 코드 특정 부분에 있는 변수, 함수, 객체들에 대한 접근성을 의미한다. 
    - 다른 말로, 스코프는 코드 범위 안 변수와 다른 자원들에 대한 참조 범위를 결정한다.

- 스코프에 대한 위의 정의에 따라, 변수에 대한 참조 범위 제한과 코드 내 어디서나 사용 가능하지 않다는 부분이 중점이다. 

- 스코프는 주로 두 가지로 정의됨 

    - 글로벌 스코프, 로컬 스코프

```javascript
var greeting = 'Welcome to blog';
(function(){
    console.log(greeting); // Welcome to blog
})();
```

- 위의 코드의 greeting 변수는 글로벌 스코프라는 것을 고려하자. 함수 안에서 접근이 가능하다 
```javascript
(function() {
    let greeting = 'Welcome to blog';
    console.log(greeting); // Welcome to blog
})

console.log(greeting) ; // Reference-Error greeting not defined
```
- 위의 코드는 로컬 스코프 

- JS ES6에서 let, const, var 타입 체크, hoisting이 추가됨
- 스코프를 배우기 위해서는 hoisting 또한 이해해야 한다.  

## 클로저 

- 클로저는 함수와 함수가 선언된 렉시컬 환경의 조합을 의미한다. 

- 클로저는 외부 함수 변수에 접근가능한 내부 함수이다. 
    - 스코프 체인 

- 클로저는 3가지의 스코프 체인을 가진다. 
    - 중괄호 사이에 정의되는 변수들 
        1. 그 자신의 스코프에 대한 접근 권한을 가짐 
        2. 외부 함수 변수들에 대한 접근 권한을 가짐 
        3. 글로벌 변수에 대한 접근 권한을 가짐 

```javascript
function User(name) {
    var displayName = function(greeting){
        console.log(greeting+' '+name);       
    }
    return displayName;
}

var myFunc = User('Raj');

myFunc('Welcome '); // Welcome Raj
myFunc('Hello '); // Hello Raj
```

- 이 코드에서, displayName()로 내부 함수를 반환하는 외부 함수인 User()를 가짐 

- 내부 함수는 외부 함수 스코프 안 변수들에 접근 권한을 가질 것이다.
    - 심지어 외부 함수가 반환되더라도!

### 모듈 패턴 

- 자바스크립트에서, 모듈은 독립적이고 재사용 가능한 코드들의 작은 조각입니다. 
- 모듈들은 많은 자바스크립트 디자인 패턴들의 기반이며, 어떤 사소한 자바스크립트 기반 애플리케이션을 빌드할 때 엄청나게 필수적이다

- Javascript 모듈은 타입으로 정의하는 대신 값으로 JS 모듈을 내보낸다. 
- HTML 템플릿 또는 CSS 스타일 시트를 포함하는 문자열을 내보내는 모듈도 일반적

- JS는 private 키워드를 가지지 않지만 클로저를 사용함으로써 private 메소드와 프로퍼티를 쓸 수 있다.

```javascript
let myModule = (function(){
    'use strict';

    var _privateProperty = 'Hello World';

    function _privateMethod() {
        console.log(_privateProperty);
    }

    return {
        publicMethod: function() {
            _privateMethod();
        }
    };
}());

myModule.publicMethod(); // outputs 'Hello World'
console.log(myModule._privateProperty); // is undefined protected by the module closure
myModule._privateMethod(); // is TypeError protected by the module closure
```

- 이 모듈들은 export 키워드를 사용해 다른 JS 파일들로 내보낼 수 있다.
```javascript
export default myModule;
```

- 모듈은 다른 JS 파일을 가져올 수 있다.
```javascript
import myModule from './myModule';
```
- 확장을 위해 모듈을 사용하면 많은 이점이 있다.
1. 유지보수성
2. 재사용성
3. 네임스페이스 분리를 통한 관리 

## Hoisting 

- 호이스팅 : 변수와 함수 선언을 코드 실행 전 그들의 스코프의 맨 위로 이동하는 자바스크립트 메커니즘 

```javascript
console.log(Hoist);
var Hoist = 'The variable Has been hoisted'; // undefined
```

- 위의 코드는, 코드 호이스팅에 대한 간단한 설명이다. 
- 사실, 자바스크립트는 변수 선언을 호이스팅한다. 결국 위 코드는 인터프리터에 의해 아래 처럼 보인다.

```javascript
var Hoist;
console.log(Hoist);
Hoist = 'The variable Has been hoisted';
```

- __자바스크립트는 오직 선언만 호이스팅할 뿐!! => 초기화는 호이스팅하지 않는다__

- __필수적으로, 함수와 변수가 어디에 선언이 되든 상관없이, 그들의 스코프가 글로벌이든, 로컬이든 관계없이 그들의 스코프 맨 위로 이동하게 된다는 점이다.__

- 함수 레벨 스코프 변수도 호이스팅된다는 것과 일치한다. 

- 호이스팅에 대해 알아야 할 것 

    1. let, var, const 키워드 

    2. 호이스팅 함수 

    3. 호이스팅 클래스 

## 커링

- 커링은 단일 매개변수를 가지는 함수의 연속된 표현을, 여러 매개변수를 가지는 함수로 판단하는 기술이다. 

- 한 번에 모든 매개변수를 가져오는 대신, 함수가 첫 번째 매개변수를 가져오고 두 번째 매개변수를 가져오고 세 번째 인수를 가져오는 새로운 함수를 반환하는 것이다.
    - 모든 인수가 충족될 때까지 계속된다. 

```javascript
var add = function(a) {
    return function(b) {
        return function(c) {
            return a+b+c;
        }
    }
}

console.log(add(2)(3)(4)); // 9
console.log(add(3)(4)(5)); // 12
```
- 이 커링은 클로저를 통해 만들어진다. 
    - 위의 프로그램의 a,b는 부모 함수의 private 프로퍼티가 된다.

- 왜 커링은 유용한가?
    - 고계함수를 만드는 데 큰 도움이 된다.
        - 이벤트 처리에 고계함수가 큰 도움을 주기 때문이다. 

- 현재 존재하는 함수를 어떻게 커링 함수로 바꿀 수 있는가?
    - 커링 함수는 일반 자바스크립트에는 존재하지 않는다.
    - lodash 같은 라이브러리가 현재 함수를 커링함수로 바꾸어주는 데 더 쉽게 만들어준다. 


## 메모이제이션

- 메모이제이션이란 이전에 연산된 결과들을 캐싱함으로써 함수의 성능을 증가시키는 프로그래밍 기술을 의미한다.

- 자바스크립트 객체는 마치 연관 배열처럼 행동하기 떄문에, 캐시 역할을 하는 이상적인 후보입니다.

- 메모이제이션 된 함수가 매 시간 호출될 떄마다, 매개변수가 캐시 인덱싱을 하는 데 사용이 된다. 

- 데이터가 존재한다면, 전체 함수가 실행되지 않고 리턴된다.
- 그러나 데이터가 캐시되어 있지 않다면, 함수는 실행된다.
    - 그 결과가 캐시에 추가된다. 

- 함수는 프로그래밍에 있어 필수적인 부분이다. 메모이제이션은 코드를 최적화하는 것이므로 => 모듈화와 재사용성을 우리 코드에 도움을 준다. 

```javascript
const memoizedAdd = () => {
    let cache = {};
    return (value) => {
        if (value in cache){
            console.log('Fetching from cache');
            return cache[value];
        }
        else {
            console.log('Calculation result');
            let result = value + 10;
            cache[value] = result;
            return result;
        }
    }
}

const newAdd = memoizedAdd();
console.log(newAdd(9)); // 19 caclulated
console.log(newAdd(9)); // 19 cached
```

### apply, call, bind 메소드

- 전통적인 JS는 객체, 프로퍼티, 메소드를 가지는데, 각 객체는 프로퍼티와 메소드를 가집니다. 

- 자바스크립트에서 call, apply, bind 메소드를 통해 마법을 할 수 있다. 

- Object1, Object2는 각각 자신만의 프로퍼티를 가진다고 생각하자 
    - 이 객체들의 공통 메소드를 call, apply, bind를 사용해서 작성할 수 있다. 

1. call 메소드

- call 메소드를 사용해 obj에 함수를 추가할 수 있다.

```javascript
var obj = {
    num : 2
}

var add = function(num2, num3, num4) {
    return this.num + num2 + num3 + num4;
}
var arr = [3, 4, 5];

console.log(add.call(obj, 3,4,5)); // 14

console.log(add.apply(obj, arr)); // 14

var bound = add.bind(obj);
console.log(bound(3,4,5)); // 14
```

2. Apply 메소드 

- Apply method 또한 같은 방식으로 작동하지만, apply 메소드를 사용할 떄는 매개변수를 배열로 정해준다는 차이점만 존재한다. 

3. Bind 메소드 

- bind 메소드는 인수로 바인딩 된 메소드를 실행해야 하는 경우,  메소드 인스턴스를 반환한다. (반환값 대신에)

## Javascript의 다형성 

- 다형성은 객체 지향 프로그래밍의 신조 중 하나입니다. 

- 동작을 공유하고 특정 동작으로 공유하는 동작을 재정의할 수 있도록 객체를 디자인하는 관행입니다. 

- 다형성은 이를 실현하기 위해 상속을 이용합니다. 

```javascript
var employee = new Employee('raja');

Employee.prototype.getDetails = function() {
    return this.name.toUpperCase();
}

console.log(employee.getDetails()); // RAJA

function Employee(name) {
    this.name = name;
}

Employee.prototype.getDetails = function() {
    return this.name;
}
```

- Employee 생성자 함수에 대한 프로토타입을 기반 메소드는 Name을 대문자로 반환하는 다른 프로토타입 함수로 재정의해야 함 
 - 그래서, 다른 Scope에서 함수를 재정의할 수 있고 메소드 오버로딩도 할 수 있습니다. 
 - JS는 네이티브 메소드 오버로딩이 없지만 여전히 구현할 수 있습니다. 

- Javascript에서의 메소드 오버로딩, 추상화, 상속 같은 몇 가지 객체 지향 개념이 존재합니다. 


## 비동기 JS

- 자바스크립트 동기와 비동기는 코드 실행 패턴입니다. 

- 자바스크립트 코드 실행은 2가지 방식으로 될 수 있습니다. 

    1. 브라우저 JS 엔진 (유명한 V8 JS 엔진)

    2. Node.js V8 Engine

- 브라우저 JS 엔진은 HTML 파일을 파싱해서 3가지 패턴으로 JS를 실행시킨다. 

    1. 동기적

    2. 비동기적

    3. defer(연기, 미룸)

```html
index.html

<script src="index.js"> // default synchronous

<script async src="index.js"> // parse as Asynchronously

<script defer src="index.js"> // parse as deferred

```

- 브라우저 JS 엔진이 HTML 파일을 파싱하는 동안 script 태그와 마주치게 되면 블로킹 될 것이다. 
    - 위의 3가지 패턴으로 JS 코드가 어떻게 실행되는지 알아보자 

1. 만약 동기적인 script 태그를 만나게 되면, JS 엔진은 그 코드를 다운로드하고 실행한 후에 아래에 있는 HTML 코드를 파싱한다.
    - 일반적으로 동기 방식은 스크립트 실행을 차단한다. 

2. 만약 비동기적인 script async 태그를 만나게 되면, 그 코드를 다운로드 하는 동안, JS 엔진은 HTML을 파싱하고 JS 코드가 다운이 되면 파싱을 일시 중지하고 JS 코드 실행으로 돌아간다. 
    - 일반적으로 비동기 방식은 스크립트 실행을 차단하지 않는다. 

3. 만약 비동기적인 script defer 태그를 만나게 되면, JS 엔진은 HTML 코드를 전부 파싱한 후에 JS Code를 실행한다. 

### NodeJS V8 엔진 

- NodeJS V8 엔진은 이벤트 루프를 기반으로 단일 스레드 형식으로 Javascript 코드를 실행한다.


## 콜백 함수 

- 콜백 함수의 정의는 다른 코드에 인수로 전달되는 실행 가능한 코드에 대한 참조, 실행 가능한 코드 조각을 의미한다. 

- 위의 정의에 따라, 콜백 함수는 다른 함수에 인자로 전달되는 함수이다. 
    - 그 후에, 외부 함수 내에서 호출되어 일종의 루틴이나 작업을 완료한다. 

```javascript
function greeting(name){
    console.log('Hello '+name) 
}

function processUserInput(callback){
    name = 'raja';
    callback(name);
}

processUserInput(greeting);
```

- 위의 프로그램은, greeting 함수가 processUserInput 함수에 인자로 호출된다. 

## 프로미스에 대한 이해 

- promise 객체는 비동기적 연산의 최종 완료 ( 또는 실패 )와 그 결과 값을 나타낸다.

- 프로미스는 비동기 함수의 결과를 나타낸다. 프로미스는 콜백함수의 체이닝을 피하는 데 사용할 수 있다. 
    - 자바스크립트에서, Javascript 코드가 비동기적으로 실행될 때마다 프로미스를 사용하는 방법 중 하나로 작업을 처리해야 한다.

- 프로미스는 꽤 오랫동안 사용되어 왔고 Promise/A+ 스펙으로 정의되어 있다.
    - ES6는 이 스펙을 Promise 구현으로 채택했고, Q, Bluebird, RSVP 등이 사양을 준수하고 그 위에 다른 기능을 제공하는 다른 Promise 라이브러리가 있다.

- Promise는 이 상태들 중 하나를 가진다. 
    - pending : 초기 상태, 이행되거나 거부되지 않음 
    - fulfilled : 연산이 완벽히 성공이 되었다는 것을 의미 
    - rejected : 연산이 실패했다는 것을 의미 

```javascript
var promise1 = new Promise(function(resolve, reject){
    isDbOperationCompleted = false;
    if(isDbOperationCompleted) {
        resolve('Completed')
    }
    else {
        reject('Not completed')
    }
})

promise1.then(function(result) {
    console.log(result) // Completed
}).catch(function(error){
    console.log(error) // if isDbOperationCompleted=FALSE
    // Not Completed
})
```
- 비동기적으로 DB 연산을 수행하는 것을 가정하는 위의 코드이다.
    - 두 개의 함수가 이행과 거부되는 프로미스 Object 인수에서,
        - 이행 또는 거부 값을 얻기 위해 콜백 함수로, then, catch를 사용해 promise를 실행할 때마다 

## Async & Await
- Babel은 async / await를 지원, async / await는 기본적으로 promise 위에 있는 문법적인 설탕입니다. 
- 이 두 키워드만으로도 Node에서 비동기코드 작성을 안정적으로 할 수 있다. 

- JS에서 비동기 패턴은 여러 버전으로 다루어진다.

- ES5 : 콜백, ES6: 프로미스, ES7 : async & await

- 그러나, 대부분의 사람들은 async / await의 전체 기반이 promise라는 것이다.

- 사실, 당신이 작성한 모든 async 함수는 프로미스로 변할 것이다.
    - 그리고 모든 await은 보통 promise가 될 것이다. 

```javascript
async function getUserDetail(){
    try{
        let users = await getUsers();
        return users[0].name;
    }
    catch (err) {
        return {s
            name: 'default user'
        };
    }
}

```
- async/await은 nodejs, 브라우저 프로그래머들 모두 매우 좋은 문법적인 개선이다. 
    - 프로미스와 비교해서, 같은 목적지에 도달할 수 있는 지름길이다. 
    - 개발자가 자바스크립트 에서 함수형 프로그래밍을 구현할 수 있게 도와주며, 코드 가독성, javascript를 더 재미있게 만들어 준다. 

- Async & Await를 이해하기 위해선 프로미스를 이해해야 한다. 
