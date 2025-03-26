# Flutter Components Assessment

This assessment will test your understanding of Flutter widgets, state management, widget composition, and navigation.

## Instructions
1. Create a new Flutter project using `flutter create component_assessment`
2. Implement the widgets described below
3. Create a main screen that displays all the widgets working together
4. Submit your completed project for review

## Requirements
You will build a user management interface with the following widgets:

### 1. UserCard Widget
Create a widget that displays a user card with the following features:
- Display user profile picture, name, email, and role
- Show an "Active" or "Inactive" badge based on user status
- Add a "View Profile" button that, when tapped, calls a function passed via parameters
- Style the card appropriately (you can use any styling approach)

Parameters:
- `user`: Object containing user data (id, name, email, avatar, role, isActive)
- `onViewProfile`: Function to call when the "View Profile" button is tapped

### 2. UserList Widget
Create a widget that displays a list of UserCard widgets:
- Should accept a list of users and render a UserCard for each
- Include a search input that filters users by name or email
- Add a dropdown filter to show "All Users", "Active Users", or "Inactive Users"
- Display a message when no users match the current filters

Parameters:
- `users`: List of user objects
- `onViewProfile`: Function to call when a user's "View Profile" button is tapped

### 3. UserForm Widget
Create a form widget for adding/editing users:
- Include fields for name, email, role (dropdown), and active status (checkbox)
- Implement form validation (all fields except active status are required)
- Show appropriate validation error messages
- Add "Submit" and "Cancel" buttons
- On submit, call a function passed via parameters with the form data

Parameters:
- `initialData`: (Optional) User object for editing an existing user
- `onSubmit`: Function to call with form data when submitted
- `onCancel`: Function to call when the cancel button is tapped

### 4. UserProfile Widget
Create a detailed user profile widget:
- Display all user information in a well-organized layout
- Include an "Edit" button that, when tapped, calls a function passed via parameters
- Include a "Back to List" button
- Style the profile to look professional

Parameters:
- `user`: User object containing all user details
- `onEdit`: Function to call when the edit button is tapped
- `onBack`: Function to call when the back button is tapped

### 5. UserDashboard Widget (Parent Widget)
Create a parent widget that combines all the above widgets:
- Maintain state for the list of users
- Implement functionality to view, add, edit, and delete users
- Toggle between the list view and profile view
- When a user is selected, show their profile
- Include a button to add a new user, which shows the form

## Sample Data
```dart
final initialUsers = [
  {
    'id': 1,
    'name': 'John Doe',
    'email': 'john@example.com',
    'avatar': 'https://randomuser.me/api/portraits/men/1.jpg',
    'role': 'Admin',
    'department': 'IT',
    'location': 'New York',
    'joinDate': '2020-01-15',
    'isActive': true,
  },
  {
    'id': 2,
    'name': 'Jane Smith',
    'email': 'jane@example.com',
    'avatar': 'https://randomuser.me/api/portraits/women/2.jpg',
    'role': 'Editor',
    'department': 'Content',
    'location': 'Los Angeles',
    'joinDate': '2021-03-20',
    'isActive': true,
  },
  {
    'id': 3,
    'name': 'Bob Johnson',
    'email': 'bob@example.com',
    'avatar': 'https://randomuser.me/api/portraits/men/3.jpg',
    'role': 'Viewer',
    'department': 'Marketing',
    'location': 'Chicago',
    'joinDate': '2019-11-05',
    'isActive': false,
  },
  {
    'id': 4,
    'name': 'Sara Williams',
    'email': 'sara@example.com',
    'avatar': 'https://randomuser.me/api/portraits/women/4.jpg',
    'role': 'Editor',
    'department': 'Design',
    'location': 'Seattle',
    'joinDate': '2022-05-10',
    'isActive': true,
  },
  {
    'id': 5,
    'name': 'Mike Brown',
    'email': 'mike@example.com',
    'avatar': 'https://randomuser.me/api/portraits/men/5.jpg',
    'role': 'Viewer',
    'department': 'Sales',
    'location': 'Boston',
    'joinDate': '2021-08-15',
    'isActive': false,
  },
];
```

## Bonus Requirements (Optional)
For extra credit, implement one or more of the following:
- Add proper Dart classes with type safety for all widgets and data
- Implement a dark/light theme toggle with Flutter themes
- Add animations for transitions between views
- Implement shared preferences to persist the user data
- Add a confirmation dialog when deleting users
- Use a state management solution like Provider, Riverpod, or GetX

## Submission Criteria
Your solution will be evaluated based on:
- Correct functionality according to requirements
- Widget organization and code structure
- Proper use of Flutter state management (StatefulWidget, setState, etc.)
- UI/UX design and responsiveness
- Code quality and best practices

## Deadline
Complete and submit this assessment within 4 days after completing the Flutter Fundamentals module.

## Starter Code
```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'user_dashboard.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'User Management Dashboard',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // Copy the sample data from above
    final initialUsers = [
      // Sample data goes here
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('User Management Dashboard'),
      ),
      body: UserDashboard(initialUsers: initialUsers),
    );
  }
} 