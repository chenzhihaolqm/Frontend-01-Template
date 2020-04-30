## Exotic Objects List
* Bound Function Exotic Objects
  * properties
	* [[BoundTargetFunction]] : The wrapped function object.
	* [[BoundThis]] : The value that is always passed as the this value when calling the wrapped function
	* [[BoundArguments]] : A list of values whose elements are used as the first arguments to any call tothe wrapped function.
  * methods
	* [[Call]] ( thisArgument, argumentsList )
	* [[Construct]] ( argumentsList, newTarget )
	* BoundFunctionCreate ( targetFunction, boundThis, boundArgs )

* Array Exotic Objects
  * properties
	*  array index
	*  non-configurable "length"
  * methods
	* [[DefineOwnProperty]] ( P, Desc )
	* ArrayCreate ( length [ , proto ] )
	* ArraySpeciesCreate ( originalArray, length )
	* ArraySetLength ( A, Desc )

* String Exotic Objects
  * properties
	* non writable and non-configurable "length"
	* [[StringData]]
  * methods
	* [[GetOwnProperty]] ( P )
	* [[DefineOwnProperty]] ( P, Desc )
	* [[OwnPropertyKeys]] ( )
	* StringCreate ( value, prototype )
	* StringGetOwnProperty ( S, P )	
	
* Arguments Exotic Objects
  * methods
	* [[GetOwnProperty]] ( P )
	* [[DefineOwnProperty]] ( P, Desc )
	* [[Get]] ( P, Receiver )
	* [[Set]] ( P, V, Receiver )
	* [[Delete]] ( P )
	* CreateUnmappedArgumentsObject ( argumentsList )
	* MakeArgGetter ( name, env )
	* MakeArgSetter ( name, env )	

* Integer-Indexed Exotic Objects
  * properties
	* [[ViewedArrayBuffer]]
	* [[ArrayLength]]
	* [[ByteOffset]]
	* [[TypedArrayName]]
  * methods
	* [[GetOwnProperty]] ( P )
	* [[HasProperty]] ( P )
	* [[DefineOwnProperty]] ( P, Desc )
	* [[Get]] ( P, Receiver )
	* [[Set]] ( P, V, Receiver )
	* [[OwnPropertyKeys]] ( )
	* IntegerIndexedObjectCreate ( prototype, internalSlotsList )
	* IntegerIndexedElementGet ( O, index )
 	* IntegerIndexedElementSet ( O, index, value )

* Module Namespace Exotic Objects
  * properties
	* [[Module]]
	* [[Exports]]
	* [[Prototype]]
  * methods
	* [[SetPrototypeOf]] ( V )
	* [[IsExtensible]] ( )
	* [[PreventExtensions]] ( )
	* [[GetOwnProperty]] ( P )
	* [[DefineOwnProperty]] ( P, Desc )
	* [[HasProperty]] ( P )
	* [[Get]] ( P, Receiver )
	* [[Set]] ( P, V, Receiver )
 	* [[Delete]] ( P )	
	* [[OwnPropertyKeys]] ( )
 	* ModuleNamespaceCreate ( module, exports )		

* Immutable Prototype Exotic Objects
  * methods
	* [[SetPrototypeOf]] ( V )
	* SetImmutablePrototype ( O, V )
	