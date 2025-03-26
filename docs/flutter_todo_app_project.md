# Flutter Todo App Project

This is the final assessment project that will test your ability to build a complete Flutter application incorporating all the concepts you've learned.

## Project Overview
Create a fully functional Todo application with the following features:

- Task management (add, edit, delete, mark as complete)
- Categories and priority levels for tasks
- Filtering and sorting options
- User authentication
- Responsive design
- Theme customization

## Technical Requirements

### 1. Setup and Architecture
- Use Flutter and Dart
- Implement a clean, organized folder structure
- Set up proper linting and formatting
- Use Flutter 3.0+ features

### 2. UI/UX Requirements
- Create a responsive, mobile-friendly design
- Implement a clean, intuitive user interface
- Include appropriate loading states and error handling
- Support both light and dark themes
- Add subtle animations for better user experience

### 3. Feature Requirements

#### Task Management
- Add new tasks with title, description, due date, category, and priority
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Batch actions (delete multiple, mark multiple as complete)

#### Organization
- Create and manage categories for tasks
- Set priority levels (High, Medium, Low)
- Add due dates to tasks
- Support task notes or additional details

#### Filtering and Search
- Filter tasks by status (All, Active, Completed)
- Filter tasks by category
- Filter tasks by priority
- Filter tasks by due date (Today, This Week, This Month)
- Search functionality to find specific tasks

#### User Experience
- Drag and drop for reordering tasks
- Keyboard shortcuts (where applicable)
- Notifications for upcoming due dates
- Undo functionality for task actions

#### Persistence
- Use shared preferences or local database (SQLite, Hive) to save todos
- Add option to export/import todos as JSON

### 4. State Management
- Implement a state management solution (Provider, Riverpod, Bloc, or GetX)
- Use custom hooks or mixins for shared logic
- Properly manage component state for forms and UI elements

### 5. Authentication (Optional but Recommended)
- Implement a simple authentication system (can be mock/simulated)
- Restrict certain actions to authenticated users
- Show user-specific tasks

## Implementation Steps

### Planning and Setup
- Create a new Flutter project
- Set up folder structure and initial widgets
- Plan your data models and state structure

### Core Functionality
- Implement basic todo CRUD operations
- Create UI widgets for tasks, lists, forms
- Implement state management

### Advanced Features
- Add filtering, sorting, and search
- Implement categories and priorities
- Add persistence with local storage

### Polish and Refinement
- Add responsive styling
- Implement dark/light theme
- Add animations and transitions
- Optimize performance

## Example Data Structure

```dart
class Task {
  String id;
  String title;
  String? description;
  bool completed;
  DateTime createdAt;
  DateTime updatedAt;
  DateTime? dueDate;
  String category;
  Priority priority;
  String? notes;
  
  // Constructor and methods
}

enum Priority { high, medium, low }

class Category {
  String id;
  String name;
  Color color;
  
  // Constructor and methods
}

class User {
  String id;
  String name;
  String email;
  
  // Constructor and methods
}
```

## Bonus Features (Optional)
For extra credit, implement one or more of these features:

- Task Recurrence: Allow setting recurring tasks (daily, weekly, monthly)
- Subtasks: Support nested tasks or checklists within a task
- Time Tracking: Track time spent on tasks
- Task Sharing: Share tasks with other users
- Data Visualization: Add charts or stats about task completion
- Background Sync: Implement background synchronization with a remote server

## Submission Criteria
Your solution will be evaluated based on:

- Functionality: Does the application work as expected?
- Code Quality: Is the code well-organized, readable, and maintainable?
- User Experience: Is the application intuitive and responsive?
- Technical Implementation: Are Flutter concepts used appropriately?
- Project Structure: Is the project well-structured and organized?

## Deadline
Work on this assessment can begin on day 8 of the program. Complete and submit this assessment within 7 days from start date.

## Starter Code

### Project Setup
```bash
flutter create todo_app
cd todo_app
flutter pub get
flutter run
```

### Basic Project Structure
```
lib/
├── main.dart                # App entry point
├── models/                  # Data models
│   ├── task.dart
│   └── category.dart
├── screens/                 # App screens
│   ├── home_screen.dart
│   ├── task_detail_screen.dart
│   └── settings_screen.dart
├── widgets/                 # Reusable widgets
│   ├── task_list.dart
│   ├── task_item.dart
│   ├── task_form.dart
│   └── filter_widget.dart
├── services/                # Business logic
│   ├── task_service.dart
│   └── storage_service.dart
└── utils/                   # Utilities
    ├── constants.dart
    └── helpers.dart
```

### Basic Widget Structure

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const TodoApp());
}

class TodoApp extends StatelessWidget {
  const TodoApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Todo Application',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.dark,
      ),
      themeMode: ThemeMode.system,
      home: const HomeScreen(),
    );
  }
}

// lib/screens/home_screen.dart
import 'package:flutter/material.dart';
import '../widgets/task_list.dart';
import '../widgets/task_form.dart';
import '../widgets/filter_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Todo Application'),
      ),
      body: Column(
        children: const [
          FilterWidget(),
          Expanded(child: TaskList()),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Show task form
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

// lib/widgets/task_list.dart
import 'package:flutter/material.dart';
import 'task_item.dart';

class TaskList extends StatelessWidget {
  const TaskList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Implement your list widget here
    return const Center(child: Text('Todo List'));
  }
}

// lib/widgets/task_form.dart
import 'package:flutter/material.dart';

class TaskForm extends StatefulWidget {
  const TaskForm({Key? key}) : super(key: key);

  @override
  State<TaskForm> createState() => _TaskFormState();
}

class _TaskFormState extends State<TaskForm> {
  @override
  Widget build(BuildContext context) {
    // Implement your form widget here
    return const Center(child: Text('Todo Form'));
  }
}

// lib/widgets/filter_widget.dart
import 'package:flutter/material.dart';

class FilterWidget extends StatelessWidget {
  const FilterWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Implement your filters widget here
    return const Padding(
      padding: EdgeInsets.all(8.0),
      child: Text('Todo Filters'),
    );
  }
}
```

## Resources
- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Documentation](https://dart.dev/guides)
- [Flutter State Management Options](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options)
- [Flutter Pub Packages](https://pub.dev)
- [Hive Database](https://pub.dev/packages/hive)
- [SQLite in Flutter](https://pub.dev/packages/sqflite)
- [Flutter Drag and Drop](https://pub.dev/packages/drag_and_drop_lists)
- [Flutter Local Notifications](https://pub.dev/packages/flutter_local_notifications)
- [Date Formatting with intl package](https://pub.dev/packages/intl) 