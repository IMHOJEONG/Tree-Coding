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



