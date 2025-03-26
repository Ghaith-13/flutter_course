---
id: 07-type-safety-in-dart
title: Type Safety in Dart
sidebar_label: Type Safety in Dart
---

# Type Safety in Dart

## Introduction to Type Safety

### What is Type Safety?
Type safety is a programming concept that ensures variables and functions are used with the correct data types. Dart is a strongly typed language that provides various features to ensure type safety.

### Benefits of Type Safety
- Catch errors at compile time
- Better code documentation
- Improved IDE support
- Enhanced code maintainability
- Better performance

## Basic Type Safety

### Type Annotations
```dart
// Explicit type annotations
String name = 'John';
int age = 25;
double price = 19.99;
bool isActive = true;

// Type inference
var inferredString = 'Hello'; // String
var inferredNumber = 42; // int
var inferredDouble = 3.14; // double
var inferredBoolean = true; // bool
```

### Type Checking
```dart
void printType(dynamic value) {
  if (value is String) {
    print('String: $value');
  } else if (value is int) {
    print('Integer: $value');
  } else if (value is double) {
    print('Double: $value');
  } else {
    print('Other type: ${value.runtimeType}');
  }
}

// Usage
printType('Hello'); // String: Hello
printType(42); // Integer: 42
printType(3.14); // Double: 3.14
```

## Null Safety

### Nullable Types
```dart
// Nullable variables
String? nullableName;
int? nullableAge;

// Null-aware operators
String name = nullableName ?? 'Guest';
int age = nullableAge ?? 0;

// Null assertion operator
String nonNullName = nullableName!; // Throws if nullableName is null

// Null-aware access operator
int? length = nullableName?.length;
```

### Required Parameters
```dart
class User {
  final String name;
  final int age;
  final String? email;

  User({
    required this.name,
    required this.age,
    this.email,
  });
}

// Usage
final user = User(
  name: 'John',
  age: 25,
  email: 'john@example.com',
);
```

## Generic Types

### Generic Classes
```dart
class Box<T> {
  T value;
  Box(this.value);
}

// Usage
Box<String> stringBox = Box('Hello');
Box<int> intBox = Box(42);
Box<double> doubleBox = Box(3.14);
```

### Generic Methods
```dart
T first<T>(List<T> list) {
  return list.first;
}

// Usage
String firstString = first(['a', 'b', 'c']);
int firstNumber = first([1, 2, 3]);
```

### Generic Constraints
```dart
class NumberBox<T extends num> {
  T value;
  NumberBox(this.value);
}

// Usage
NumberBox<int> intBox = NumberBox(42);
NumberBox<double> doubleBox = NumberBox(3.14);
// NumberBox<String> stringBox = NumberBox('Hello'); // Error
```

## Type Casting

### Safe Type Casting
```dart
void processValue(dynamic value) {
  if (value is String) {
    final stringValue = value as String;
    print(stringValue.toUpperCase());
  } else if (value is int) {
    final intValue = value as int;
    print(intValue * 2);
  }
}

// Usage
processValue('Hello'); // HELLO
processValue(42); // 84
```

### Type Conversion
```dart
// String to number
int number = int.parse('42');
double decimal = double.parse('3.14');

// Number to string
String numberString = 42.toString();
String decimalString = 3.14.toString();

// Custom type conversion
class Temperature {
  final double celsius;

  Temperature(this.celsius);

  double get fahrenheit => (celsius * 9 / 5) + 32;
}
```

## Type Guards

### Using Type Guards
```dart
class Animal {
  void makeSound() {
    print('Some sound');
  }
}

class Dog extends Animal {
  @override
  void makeSound() {
    print('Woof!');
  }

  void fetch() {
    print('Fetching...');
  }
}

void processAnimal(Animal animal) {
  if (animal is Dog) {
    animal.fetch(); // Safe to call fetch() here
  }
  animal.makeSound();
}
```

### Type Guards with Generics
```dart
class Container<T> {
  final T value;
  Container(this.value);
}

void processContainer(Container<dynamic> container) {
  if (container is Container<String>) {
    print(container.value.toUpperCase());
  } else if (container is Container<int>) {
    print(container.value * 2);
  }
}
```

## Type Aliases

### Creating Type Aliases
```dart
typedef UserMap = Map<String, dynamic>;
typedef StringCallback = void Function(String);

// Usage
UserMap user = {
  'name': 'John',
  'age': 25,
};

void processName(StringCallback callback) {
  callback('John');
}
```

### Complex Type Aliases
```dart
typedef JsonMap = Map<String, dynamic>;
typedef JsonList = List<JsonMap>;

class ApiResponse<T> {
  final T data;
  final String message;
  final bool success;

  ApiResponse({
    required this.data,
    required this.message,
    required this.success,
  });

  factory ApiResponse.fromJson(JsonMap json) {
    return ApiResponse(
      data: json['data'],
      message: json['message'],
      success: json['success'],
    );
  }
}
```

## Type Safety Best Practices

### 1. Use Explicit Types
```dart
// Good
String name = 'John';
int age = 25;

// Bad
var name = 'John';
var age = 25;
```

### 2. Avoid Dynamic Types
```dart
// Good
List<String> names = ['John', 'Jane'];

// Bad
List<dynamic> names = ['John', 'Jane'];
```

### 3. Use Null Safety
```dart
// Good
String? nullableName;
String name = nullableName ?? 'Guest';

// Bad
String nullableName; // Null safety disabled
```

### 4. Use Type Guards
```dart
// Good
if (value is String) {
  final stringValue = value as String;
  print(stringValue.toUpperCase());
}

// Bad
final stringValue = value as String; // Unsafe cast
```

### 5. Use Generic Types
```dart
// Good
class Box<T> {
  T value;
  Box(this.value);
}

// Bad
class Box {
  dynamic value;
  Box(this.value);
}
```

## Type Safety Tools

### Static Analysis
```yaml
# analysis_options.yaml
analyzer:
  strong-mode:
    implicit-casts: false
    implicit-dynamic: false
  errors:
    invalid_assignment: error
    missing_return: error
  warnings:
    dead_code: warning
    unused_local_variable: warning
```

### Type Checking Tools
```dart
// Using type checking functions
bool isNumeric(String value) {
  return double.tryParse(value) != null;
}

bool isValidEmail(String email) {
  return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
}
```

### Type Testing
```dart
void testTypeSafety() {
  // Test type annotations
  String name = 'John';
  assert(name is String);

  // Test null safety
  String? nullableName;
  assert(nullableName == null);

  // Test type casting
  dynamic value = 'Hello';
  assert(value is String);
  assert((value as String).toUpperCase() == 'HELLO');

  // Test generic types
  Box<String> stringBox = Box('Hello');
  assert(stringBox.value is String);
}
``` 