---
id: 02-flutter-basics
title: Flutter Basics
sidebar_label: Flutter Basics
---

# Flutter Basics

## Introduction to Flutter

### What is Flutter?
Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.

### Key Features
- Hot Reload
- Cross-platform development
- Rich widget library
- Native performance
- Material Design and Cupertino widgets

## Project Structure

### Basic Project Layout
```
my_app/
  ├── lib/
  │   ├── main.dart
  │   ├── screens/
  │   ├── widgets/
  │   ├── models/
  │   └── services/
  ├── assets/
  ├── test/
  └── pubspec.yaml
```

### pubspec.yaml
```yaml
name: my_app
description: A new Flutter project
version: 1.0.0+1

environment:
  sdk: ">=2.12.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

## Basic Widgets

### Stateless Widget
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My App'),
        ),
        body: Center(
          child: Text('Hello, Flutter!'),
        ),
      ),
    );
  }
}
```

### Stateful Widget
```dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

## Layout Widgets

### Container
```dart
Container(
  width: 100,
  height: 100,
  margin: EdgeInsets.all(8),
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('Hello'),
)
```

### Row and Column
```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Text('First'),
    Text('Second'),
    Text('Third'),
  ],
)

Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Top'),
    Text('Middle'),
    Text('Bottom'),
  ],
)
```

### Stack
```dart
Stack(
  children: [
    Container(
      color: Colors.blue,
      width: 200,
      height: 200,
    ),
    Positioned(
      top: 20,
      left: 20,
      child: Text('Overlay'),
    ),
  ],
)
```

## Navigation

### Basic Navigation
```dart
// Navigate to a new screen
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => SecondScreen(),
  ),
);

// Navigate back
Navigator.pop(context);

// Navigate with replacement
Navigator.pushReplacement(
  context,
  MaterialPageRoute(
    builder: (context) => SecondScreen(),
  ),
);
```

### Named Routes
```dart
// Define routes
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => HomeScreen(),
    '/second': (context) => SecondScreen(),
  },
);

// Navigate using named route
Navigator.pushNamed(context, '/second');
```

## State Management

### setState
```dart
class _MyWidgetState extends State<MyWidget> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++;
    });
  }
}
```

### InheritedWidget
```dart
class MyInheritedWidget extends InheritedWidget {
  final int counter;

  MyInheritedWidget({
    required this.counter,
    required Widget child,
  }) : super(child: child);

  static MyInheritedWidget of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<MyInheritedWidget>()!;
  }
}
```

## Forms and Input

### TextField
```dart
TextField(
  decoration: InputDecoration(
    labelText: 'Username',
    border: OutlineInputBorder(),
  ),
  onChanged: (value) {
    print('Username: $value');
  },
)
```

### Form
```dart
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter some text';
          }
          return null;
        },
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            // Form is valid
          }
        },
        child: Text('Submit'),
      ),
    ],
  ),
)
```

## Assets and Resources

### Adding Assets
1. Create an `assets` folder in your project root
2. Add assets to `pubspec.yaml`:
```yaml
flutter:
  assets:
    - assets/images/
    - assets/fonts/
```

### Using Assets
```dart
Image.asset('assets/images/logo.png')
Image.network('https://example.com/image.jpg')
```

## Testing

### Unit Tests
```dart
void main() {
  test('Counter increments', () {
    final counter = Counter();
    counter.increment();
    expect(counter.value, 1);
  });
}
```

### Widget Tests
```dart
void main() {
  testWidgets('Counter increments', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());
    expect(find.text('0'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();
    expect(find.text('1'), findsOneWidget);
  });
}
``` 