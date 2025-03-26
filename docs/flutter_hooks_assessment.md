# Flutter State Management Assessment

This assessment will test your understanding of Flutter state management, custom hooks, and reactive programming.

## Instructions
1. Create a new Flutter project using `flutter create state_management_assessment`
2. Implement the custom services, providers, and widgets described below
3. Create a main screen that demonstrates all the components working together
4. Submit your completed project for review

## Requirements

### Part 1: Create Custom State Management Utilities

#### 1. SharedPreferencesService
Create a service that manages state and persists it to SharedPreferences:

```dart
class SharedPreferencesService {
  // Implement a service that:
  // - Reads from SharedPreferences on initial access
  // - Updates SharedPreferences when state changes
  // - Provides methods to get and set values
}
```

Usage example:

```dart
class ThemeToggle extends StatefulWidget {
  @override
  _ThemeToggleState createState() => _ThemeToggleState();
}

class _ThemeToggleState extends State<ThemeToggle> {
  late SharedPreferencesService _prefsService;
  late String theme;

  @override
  void initState() {
    super.initState();
    _prefsService = SharedPreferencesService();
    theme = _prefsService.getString('theme') ?? 'light';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: theme == 'light' ? Colors.white : Colors.black,
      child: ElevatedButton(
        onPressed: () {
          setState(() {
            theme = theme == 'light' ? 'dark' : 'light';
            _prefsService.setString('theme', theme);
          });
        },
        child: Text('Switch to ${theme == 'light' ? 'dark' : 'light'} theme'),
      ),
    );
  }
}
```

#### 2. ApiService
Create a service for data fetching:

```dart
class ApiService {
  // Implement a service that:
  // - Fetches data from provided URLs
  // - Handles loading and error states
  // - Supports a refetch function
  // - Returns data, loading state, and error information
}
```

Usage example:

```dart
class UserList extends StatefulWidget {
  @override
  _UserListState createState() => _UserListState();
}

class _UserListState extends State<UserList> {
  final ApiService _apiService = ApiService();
  bool isLoading = true;
  String? error;
  List<dynamic>? users;

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    final result = await _apiService.get('https://jsonplaceholder.typicode.com/users');
    setState(() {
      isLoading = result.isLoading;
      error = result.error;
      users = result.data;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) return Center(child: CircularProgressIndicator());
    if (error != null) return Center(child: Text('Error: $error'));

    return Column(
      children: [
        ElevatedButton(
          onPressed: _fetchUsers,
          child: Text('Refresh'),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: users?.length ?? 0,
            itemBuilder: (context, index) => ListTile(
              title: Text(users![index]['name']),
            ),
          ),
        ),
      ],
    );
  }
}
```

#### 3. FormController
Create a form controller for handling forms:

```dart
class FormController {
  // Implement a controller that:
  // - Manages form values, errors, and submission state
  // - Provides validation functionality
  // - Tracks touched fields
  // - Handles form submission
}
```

Usage example:

```dart
class LoginForm extends StatefulWidget {
  final Function(Map<String, dynamic>) onSubmit;
  
  LoginForm({required this.onSubmit});
  
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  late FormController _formController;

  @override
  void initState() {
    super.initState();
    _formController = FormController(
      initialValues: {
        'email': '',
        'password': '',
      },
      validate: (values) {
        final errors = <String, String>{};
        if (values['email'].isEmpty) errors['email'] = 'Required';
        if (values['password'].isEmpty) errors['password'] = 'Required';
        return errors;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(labelText: 'Email'),
            onChanged: (value) => _formController.setValue('email', value),
          ),
          if (_formController.touched['email'] == true && 
              _formController.errors['email'] != null)
            Text(_formController.errors['email']!, style: TextStyle(color: Colors.red)),
            
          TextFormField(
            decoration: InputDecoration(labelText: 'Password'),
            obscureText: true,
            onChanged: (value) => _formController.setValue('password', value),
          ),
          if (_formController.touched['password'] == true && 
              _formController.errors['password'] != null)
            Text(_formController.errors['password']!, style: TextStyle(color: Colors.red)),
            
          ElevatedButton(
            onPressed: _formController.isSubmitting 
                ? null 
                : () => _formController.submit(widget.onSubmit),
            child: Text(_formController.isSubmitting ? 'Logging in...' : 'Log In'),
          ),
        ],
      ),
    );
  }
}
```

### Part 2: State Management with Provider/Riverpod

#### 1. ThemeProvider
Create a theme provider that provides light/dark theme functionality:

```dart
// Create ThemeProvider class using Provider/Riverpod/GetX
// The provider should:
// - Use SharedPreferencesService to persist theme preference
// - Provide a toggleTheme function
// - Make theme and toggleTheme available to consumers
```

Usage example:

```dart
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    
    return MaterialApp(
      themeMode: themeMode == 'dark' ? ThemeMode.dark : ThemeMode.light,
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      home: HomePage(),
    );
  }
}

class ThemedButton extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = ref.watch(themeProvider);
    
    return ElevatedButton(
      onPressed: () => ref.read(themeProvider.notifier).toggleTheme(),
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(
          theme == 'dark' ? Colors.grey[800] : Colors.white,
        ),
        foregroundColor: MaterialStateProperty.all(
          theme == 'dark' ? Colors.white : Colors.black,
        ),
      ),
      child: Text('Toggle Theme'),
    );
  }
}
```

#### 2. AuthProvider
Create an authentication provider that manages user login state:

```dart
// Create AuthProvider class using Provider/Riverpod/GetX
// The provider should:
// - Manage user login state
// - Provide login, logout functions
// - Use SharedPreferencesService to persist auth state
```

Usage example:

```dart
class LoginButton extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    
    if (authState.isLoggedIn) {
      return Row(
        children: [
          Text('Welcome, ${authState.user!.name}'),
          TextButton(
            onPressed: () => ref.read(authProvider.notifier).logout(),
            child: Text('Log Out'),
          ),
        ],
      );
    }
    
    return ElevatedButton(
      onPressed: () => ref.read(authProvider.notifier).login(
        User(name: 'John', email: 'john@example.com'),
      ),
      child: Text('Log In'),
    );
  }
}
```

### Part 3: State Management Integration

Create a TodoApp that combines all your state management approaches:

- Use SharedPreferencesService to persist todos
- Use ApiService to load initial todos from an API
- Use FormController for a form to add new todos
- Use the ThemeProvider to apply theming
- Use the AuthProvider to restrict certain features to logged-in users only

## Submission Criteria
Your solution will be evaluated based on:

- Correct implementation of state management solutions
- Proper composition of state management approaches
- Error handling and edge cases
- Code organization and readability
- Performance considerations (e.g., preventing unnecessary rebuilds)

## Deadline
Complete and submit this assessment within 3 days after completing the Flutter State Management module.

## Resources
- [Flutter Provider package](https://pub.dev/packages/provider)
- [Flutter Riverpod package](https://pub.dev/packages/flutter_riverpod)
- [Flutter GetX package](https://pub.dev/packages/get)
- [shared_preferences package](https://pub.dev/packages/shared_preferences)
- [http package](https://pub.dev/packages/http)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (for testing API calls)

## Starter Code

```dart
// services/shared_preferences_service.dart
import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesService {
  // TODO: Implement this service
}

// services/api_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  // TODO: Implement this service
}

// controllers/form_controller.dart
class FormController {
  // TODO: Implement this controller
}

// providers/theme_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/shared_preferences_service.dart';

// TODO: Implement ThemeProvider

// providers/auth_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/shared_preferences_service.dart';

// TODO: Implement AuthProvider

// screens/todo_app.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/shared_preferences_service.dart';
import '../services/api_service.dart';
import '../controllers/form_controller.dart';
import '../providers/theme_provider.dart';
import '../providers/auth_provider.dart';

class TodoApp extends ConsumerWidget {
  // TODO: Implement this widget using all state management approaches
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Build your TodoApp UI here
  }
}
``` 