# Flutter Exercise Assessment

This assessment will test your understanding of Dart and Flutter concepts that are crucial for Flutter development.

## Instructions

1. Create a new Dart file named `user_profile.dart`
2. Implement the functions described below
3. Test your code by running it in a Flutter environment
4. Submit your completed file for review

## Requirements

### Part 1: Data Transformation

Create a function called `processUserData` that:

- Takes a List of User objects as input
- Filters out users that are not active
- Transforms each user object to include only id, fullName (combination of firstName and lastName), and email
- Sorts users alphabetically by fullName

Example input:

```dart
final users = [
  User(
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    isActive: true,
  ),
  User(
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    isActive: false,
  ),
  User(
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    isActive: true,
  ),
  User(
    id: 4,
    firstName: "Sara",
    lastName: "Williams",
    email: "sara@example.com",
    isActive: true,
  ),
];
```

Expected output:

```dart
[
  UserProfile(id: 3, fullName: "Bob Johnson", email: "bob@example.com"),
  UserProfile(id: 1, fullName: "John Doe", email: "john@example.com"),
  UserProfile(id: 4, fullName: "Sara Williams", email: "sara@example.com"),
]
```

### Part 2: Async Data Fetching

Create a function called `fetchUserPosts` that:

- Takes a user ID as a parameter
- Fetches user posts from a fake API endpoint: https://jsonplaceholder.typicode.com/posts
- Returns a Future that resolves to a List of post titles
- Handles errors appropriately

Example usage:

```dart
void main() async {
  try {
    final titles = await fetchUserPosts(1);
    print(titles);
  } catch (error) {
    print('Error: $error');
  }
}

// Example output: ['Post title 1', 'Post title 2', ...]
```

### Part 3: Creating a User Widget

Create a function called `createUserProfileWidget` that:

- Takes a User object as a parameter
- Returns a Widget representing a user profile card
- Uses Flutter's widget composition
- Conditionally includes an "Active" badge if the user is active

Example input:

```dart
final user = User(
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  isActive: true,
  role: "Admin",
);
```

Expected widget structure:
- Card widget as the container
- Row with CircleAvatar for the image
- Column for user information
- Conditional badge for active status

### Part 4: State Management Helper

Create a class called `StateManager` that:

- Takes an initial state Map as a parameter
- Provides methods for:
  - `getState()`: Returns the current state
  - `setState(Map<String, dynamic> newState)`: Updates the state by merging the newState with the current state
  - `subscribe(Function(Map<String, dynamic>) callback)`: Registers a callback function that will be called whenever the state changes

Example usage:

```dart
final userState = StateManager({'name': 'John', 'online': false});

// Subscribe to changes
userState.subscribe((state) => print('State changed: $state'));

// Get current state
print(userState.getState()); // {name: 'John', online: false}

// Update state
userState.setState({'online': true});
// This should log: 'State changed: {name: 'John', online: true}'

// Update state with new property
userState.setState({'lastActive': '2023-05-01'});
// This should log: 'State changed: {name: 'John', online: true, lastActive: '2023-05-01'}'
```

## Submission Criteria

Your solution will be evaluated based on:

1. Correct functionality according to requirements
2. Proper use of Dart and Flutter features
3. Code organization and readability
4. Error handling
5. Efficiency of the implementation
6. Proper use of Flutter widgets and state management

## Deadline

Complete and submit this assessment within 2 days after completing the Flutter Basics module.

## Starter Code

```dart
// user_profile.dart

// Part 1: Data Transformation
List<UserProfile> processUserData(List<User> users) {
  // Your code here
}

// Part 2: Async Data Fetching
Future<List<String>> fetchUserPosts(int userId) async {
  // Your code here
}

// Part 3: Creating a User Widget
Widget createUserProfileWidget(User user) {
  // Your code here
}

// Part 4: State Management Helper
class StateManager {
  // Your code here
}

// Test your functions
void main() {
  final users = [
    User(
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      isActive: true,
    ),
    // ... other test users
  ];

  print("Processed Users: ${processUserData(users)}");

  fetchUserPosts(1)
      .then((titles) => print("User Posts: $titles"))
      .catchError((error) => print("Error fetching posts: $error"));

  final sampleUser = User(
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    isActive: true,
    role: "Admin",
  );

  print("User Profile Widget: ${createUserProfileWidget(sampleUser)}");

  final userState = StateManager({'name': 'John', 'online': false});
  userState.subscribe((state) => print("State changed: $state"));
  print("Initial State: ${userState.getState()}");
  userState.setState({'online': true});
  userState.setState({'lastActive': '2023-05-01'});
}
``` 