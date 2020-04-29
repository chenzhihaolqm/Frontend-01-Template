## Aton 拆解
* Grammar
  * Grammar tree vs Priority(语法树与运算符优先级)
  * Left hand side & Right hand side ( c = a + b)
* Runtime
  * Types Conversion
## Expressions
* Member
  * a.b
  * a[b]
  * foo`string`
  * super.b
  * super['b']
  * new.target
  * new Foo()
* Call
  * foo()
  * super()
  * foo().b
  * foo()['b']
* Update
  * a++/++a
  * a--/--a
* Unary
  * delete a.b
  * void foo()
  * typeof a
  * +a/-a
  * !a
  * ~a
  * await a


## Aton 拆解
* Grammar
  * 简单语句
    *Expression Statement (c = a + b)
	*EmptyStatement (;)
	*DebuggerStatement (debugger)
	*ThrowStatement (throw)
	*ContinueStatement 
	*BreakStatement
	*ReturnStatement 
  * 组合语句
    *BlockStatement
	*IfStatement
	*SwitchStatement
	*IterationStatement (遍历)
	*WithStatement (with(o){ o.x = 1})
	*LabeledStatement (标签)
	*TryStatement   
  * 声明
    *FunctionDeclaration
	*GeneratorDeclaration (*)
	*AsyncFunctionDeclaration (async)
	*AsyncGeneratorDeclaration (async *)
	*VariableStament  (var, let, const)
	*ClassDeclaration (class)
	*LexicalDeclaration    
* Runtime
  * Completion Record
    * [type]: normal break continue return throw
	* [value]: types
	* [target]: label
  * Lexical Environment
## 对象
* 实现
  * 基于类（分类，归类）
  * 基于原型（照猫画虎）
* 三要素
  * 唯一性， 状态， 行为 （封装， 继承， 多态）
## Object in Javascript
* Data Property
  * [[value]]
  * writable 
  * enumerable
  * configurable
* Accessor Property
  * get
  * set 
  * enumerable
  * configurable
* 函数对象
预处理：代码在编译阶段，会将var声明变量提升到作用域顶部。
作用域与执行上下文：作用域是开发者代码块中的声明变量的作用范围；执行上下文是运行在客户端的一个内存对象，保存着运行时的对象信息，可以通过call,apply来改变执行上下文
