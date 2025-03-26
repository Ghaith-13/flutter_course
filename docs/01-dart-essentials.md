---
id: 01-dart-essentials
title: Dart Essentials
sidebar_label: Dart Essentials
---

# Dart Essentials for Flutter Development

## Variables and Data Types

### Basic Types
```dart
// Numbers
int age = 25;
double price = 19.99;

// Strings
String name = 'John';
String multiline = '''
This is a
multiline string
''';

// Booleans
bool isActive = true;

// Lists
List<String> fruits = ['apple', 'banana', 'orange'];
List<dynamic> mixed = [1, 'hello', true];

// Maps
Map<String, dynamic> person = {
  'name': 'John',
  'age': 25,
  'isActive': true,
};
```

### Null Safety
```dart
// Nullable variables
String? nullableName;
int? nullableAge;

// Null-aware operators
String name = nullableName ?? 'Guest';
int age = nullableAge ?? 0;

// Late initialization
late String lateName;
late int lateAge;

// Required parameters
void greet({required String name}) {
  print('Hello, $name!');
}
```

## Functions

### Basic Functions
```dart
// Simple function
void sayHello() {
  print('Hello!');
}

// Function with parameters
int add(int a, int b) {
  return a + b;
}

// Arrow syntax
int multiply(int a, int b) => a * b;

// Optional parameters
void greet(String name, {String? title}) {
  print('Hello, ${title ?? ''} $name');
}
```

### Async Functions
```dart
// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data loaded';
}

// Stream
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}
```

## Classes and Objects

### Basic Class
```dart
class Person {
  // Properties
  String name;
  int age;
  
  // Constructor
  Person(this.name, this.age);
  
  // Named constructor
  Person.guest() : name = 'Guest', age = 0;
  
  // Method
  void sayHello() {
    print('Hello, I am $name');
  }
}
```

### Inheritance
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
```

## Error Handling

### Try-Catch
```dart
try {
  // Risky code
  int result = 10 ~/ 0;
} catch (e) {
  print('Error: $e');
} finally {
  print('Always executed');
}
```

### Custom Exceptions
```dart
class ValidationException implements Exception {
  final String message;
  ValidationException(this.message);
  
  @override
  String toString() => message;
}

void validateAge(int age) {
  if (age < 0) {
    throw ValidationException('Age cannot be negative');
  }
}
```

## Generics

### Generic Classes
```dart
class Box<T> {
  T value;
  Box(this.value);
}

// Usage
Box<String> stringBox = Box('Hello');
Box<int> intBox = Box(42);
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

## Mixins

### Using Mixins
```dart
mixin Swimming {
  void swim() {
    print('Swimming...');
  }
}

mixin Flying {
  void fly() {
    print('Flying...');
  }
}

class Duck extends Animal with Swimming, Flying {
  @override
  void makeSound() {
    print('Quack!');
  }
}
```

## Extensions

### Adding Methods to Classes
```dart
extension StringExtension on String {
  bool get isPalindrome {
    return this == this.split('').reversed.join('');
  }
  
  String get capitalize {
    return '${this[0].toUpperCase()}${this.substring(1)}';
  }
}

// Usage
String word = 'hello';
print(word.capitalize); // 'Hello'
print('madam'.isPalindrome); // true
``` 