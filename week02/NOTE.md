# 每周总结可以写在这里
## 语言按语法分类
  - 非形式语言
	- 中文
  - 形式语言
    - 0型 无限制问法
	- 1型 上下文相关文法
	- 2型 上下文无关文法
	- 3型 正则文法
## 产生式（BNF）运算实例
```
整数连加
"+"
<Number>: "0" | "1" ... "9"
<Deciamal>: "0" | (("1" ~ "9") <Number>+)
<Expression>: <Deciamal> ("+" <Deciamal>)+
<Expression>: Deciamal | (<Expression> "+" <Deciamal>)

四则运算
<PrimaryExpression> = <DecimalNumber> |
"(" <LogicalExpression> ")"


<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>


<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

逻辑判断
<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>

```
终结符, 如: "+ - * /"
非终结符: 如:  <MultiplicativeExpression> <AdditiveExpression> <LogicalExpression>

## 图灵完备性
* 命令式 -- 图灵机
  * goto
  * if while
* 声明式 -- lambda
  * 递归
  * 分治
## 一般命令式编程语言
- Aton
- Expression
- Statement
- Structure
- Program