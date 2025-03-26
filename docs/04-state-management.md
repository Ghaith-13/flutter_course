---
id: 04-state-management
title: State Management
sidebar_label: State Management
---

# State Management in Flutter

## State Management Solutions

### Provider
Provider is a lightweight state management solution that's easy to understand and implement.

#### Basic Setup
```dart
import 'package:provider/provider.dart';

// Create a model class
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }

  void decrement() {
    _count--;
    notifyListeners();
  }
}

// Wrap your app with a ChangeNotifierProvider
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: MyApp(),
    ),
  );
}

// Use the state in your widgets
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<CounterModel>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('Count: ${counter.count}'),
            ElevatedButton(
              onPressed: () => counter.increment(),
              child: Text('Increment'),
            ),
            ElevatedButton(
              onPressed: () => counter.decrement(),
              child: Text('Decrement'),
            ),
          ],
        );
      },
    );
  }
}

#### Multiple Providers
```dart
class UserModel extends ChangeNotifier {
  String _name = '';
  String _email = '';
  
  String get name => _name;
  String get email => _email;

  void updateUser({String? name, String? email}) {
    _name = name ?? _name;
    _email = email ?? _email;
    notifyListeners();
  }
}

// Using multiple providers
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CounterModel()),
        ChangeNotifierProvider(create: (_) => UserModel()),
      ],
      child: MyApp(),
    ),
  );
}
```

### Riverpod
Riverpod is a modern state management solution that provides better type safety and dependency injection.

#### Basic Setup
```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Create a provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

// Create a notifier class
class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);

  void increment() => state++;
  void decrement() => state--;
}

// Use in your app
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

// Use the state in widgets
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);

    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).increment(),
          child: Text('Increment'),
        ),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).decrement(),
          child: Text('Decrement'),
        ),
      ],
    );
  }
}
```

#### Async Data
```dart
// Create an async provider
final userProvider = FutureProvider<User>((ref) async {
  final response = await http.get(Uri.parse('https://api.example.com/user'));
  return User.fromJson(jsonDecode(response.body));
});

// Use in widget
class UserWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProvider);

    return userAsync.when(
      data: (user) => Text('Welcome ${user.name}'),
      loading: () => CircularProgressIndicator(),
      error: (error, stack) => Text('Error: $error'),
    );
  }
}
```

### GetX
GetX provides a comprehensive solution for state management, routing, and dependency injection.

#### Basic Setup
```dart
import 'package:get/get.dart';

// Create a controller
class CounterController extends GetxController {
  var count = 0.obs; // Observable variable

  void increment() => count++;
  void decrement() => count--;
}

// Use in your app
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final CounterController c = Get.put(CounterController());

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('GetX Counter')),
        body: Center(
          child: Obx(() => Text(
            'Count: ${c.count}',
            style: TextStyle(fontSize: 30),
          )),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: c.increment,
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

#### Reactive State Management
```dart
class UserController extends GetxController {
  var user = User().obs;
  var isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchUser();
  }

  Future<void> fetchUser() async {
    isLoading.value = true;
    try {
      final response = await http.get(Uri.parse('https://api.example.com/user'));
      user.value = User.fromJson(jsonDecode(response.body));
    } finally {
      isLoading.value = false;
    }
  }
}

// Use in widget
class UserProfile extends GetView<UserController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(() {
        if (controller.isLoading.value) {
          return CircularProgressIndicator();
        }
        return Column(
          children: [
            Text('Name: ${controller.user.value.name}'),
            Text('Email: ${controller.user.value.email}'),
          ],
        );
      }),
    );
  }
}
```

### Cubit
Cubit is a lightweight state management solution that's a simplified version of BLoC.

#### Basic Setup
```dart
import 'package:flutter_bloc/flutter_bloc.dart';

// Create Cubit
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);

  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

// Use in your app
void main() {
  runApp(
    BlocProvider(
      create: (context) => CounterCubit(),
      child: MyApp(),
    ),
  );
}

// Use in widget
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterCubit, int>(
      builder: (context, count) {
        return Column(
          children: [
            Text('Count: $count'),
            ElevatedButton(
              onPressed: () => context.read<CounterCubit>().increment(),
              child: Text('Increment'),
            ),
            ElevatedButton(
              onPressed: () => context.read<CounterCubit>().decrement(),
              child: Text('Decrement'),
            ),
          ],
        );
      },
    );
  }
}
```

### BLoC
BLoC is a robust state management pattern that separates business logic from UI, making your code more testable and maintainable.

#### Basic Setup
```dart
import 'package:flutter_bloc/flutter_bloc.dart';

// Create events
abstract class CounterEvent {}
class IncrementEvent extends CounterEvent {}
class DecrementEvent extends CounterEvent {}

// Create states
class CounterState {
  final int count;
  const CounterState(this.count);
}

// Create BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<IncrementEvent>((event, emit) {
      emit(CounterState(state.count + 1));
    });

    on<DecrementEvent>((event, emit) {
      emit(CounterState(state.count - 1));
    });
  }
}

// Use in your app
void main() {
  runApp(
    BlocProvider(
      create: (context) => CounterBloc(),
      child: MyApp(),
    ),
  );
}

// Use the state in widgets
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return Column(
          children: [
            Text('Count: ${state.count}'),
            ElevatedButton(
              onPressed: () => context.read<CounterBloc>().add(IncrementEvent()),
              child: Text('Increment'),
            ),
            ElevatedButton(
              onPressed: () => context.read<CounterBloc>().add(DecrementEvent()),
              child: Text('Decrement'),
            ),
          ],
        );
      },
    );
  }
}
```

#### Advanced BLoC Example with Repository
```dart
// Define Events
abstract class UserEvent {}
class FetchUserEvent extends UserEvent {}
class UpdateUserEvent extends UserEvent {
  final String name;
  UpdateUserEvent(this.name);
}

// Define States
abstract class UserState {}
class UserInitial extends UserState {}
class UserLoading extends UserState {}
class UserLoaded extends UserState {
  final User user;
  UserLoaded(this.user);
}
class UserError extends UserState {
  final String message;
  UserError(this.message);
}

// Create Repository
class UserRepository {
  Future<User> fetchUser() async {
    try {
      final response = await http.get(Uri.parse('https://api.example.com/user'));
      return User.fromJson(jsonDecode(response.body));
    } catch (e) {
      throw Exception('Failed to load user: $e');
    }
  }
}

// Create BLoC
class UserBloc extends Bloc<UserEvent, UserState> {
  final UserRepository repository;

  UserBloc({required this.repository}) : super(UserInitial()) {
    on<FetchUserEvent>(_onFetchUser);
    on<UpdateUserEvent>(_onUpdateUser);
  }

  Future<void> _onFetchUser(FetchUserEvent event, Emitter<UserState> emit) async {
    emit(UserLoading());
    try {
      final user = await repository.fetchUser();
      emit(UserLoaded(user));
    } catch (e) {
      emit(UserError(e.toString()));
    }
  }

  void _onUpdateUser(UpdateUserEvent event, Emitter<UserState> emit) {
    if (state is UserLoaded) {
      final currentUser = (state as UserLoaded).user;
      final updatedUser = User(
        id: currentUser.id,
        name: event.name,
        email: currentUser.email,
      );
      emit(UserLoaded(updatedUser));
    }
  }
}

// Use in your app
void main() {
  final userRepository = UserRepository();
  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => UserBloc(repository: userRepository)..add(FetchUserEvent()),
        ),
      ],
      child: MyApp(),
    ),
  );
}

// Use in widget with BlocConsumer
class UserProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('User Profile')),
      body: BlocConsumer<UserBloc, UserState>(
        listener: (context, state) {
          if (state is UserError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.message)),
            );
          }
        },
        builder: (context, state) {
          if (state is UserLoading) {
            return Center(child: CircularProgressIndicator());
          } else if (state is UserLoaded) {
            return Column(
              children: [
                Text('Name: ${state.user.name}'),
                Text('Email: ${state.user.email}'),
                ElevatedButton(
                  onPressed: () => context.read<UserBloc>().add(
                    UpdateUserEvent('New User Name'),
                  ),
                  child: Text('Update Name'),
                ),
              ],
            );
          } else {
            return Center(child: Text('Press the button to load user'));
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.read<UserBloc>().add(FetchUserEvent()),
        child: Icon(Icons.refresh),
      ),
    );
  }
} 