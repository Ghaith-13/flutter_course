---
id: 05-application-structure
title: Application Structure
sidebar_label: Application Structure
---

# Flutter Application Structure

## Project Organization

### Recommended Directory Structure
```
lib/
  ├── core/
  │   ├── constants/
  │   ├── errors/
  │   ├── network/
  │   └── utils/
  ├── data/
  │   ├── datasources/
  │   ├── models/
  │   └── repositories/
  ├── domain/
  │   ├── entities/
  │   ├── repositories/
  │   └── usecases/
  ├── presentation/
  │   ├── bloc/
  │   ├── pages/
  │   └── widgets/
  └── main.dart
```

### Core Layer
```dart
// lib/core/constants/app_constants.dart
class AppConstants {
  static const String apiBaseUrl = 'https://api.example.com';
  static const int connectionTimeout = 30000;
  static const int receiveTimeout = 30000;
}

// lib/core/errors/failures.dart
abstract class Failure {
  final String message;
  const Failure(this.message);
}

class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

class CacheFailure extends Failure {
  const CacheFailure(String message) : super(message);
}
```

### Data Layer
```dart
// lib/data/models/user_model.dart
class UserModel {
  final int id;
  final String name;
  final String email;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}

// lib/data/repositories/user_repository_impl.dart
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;

  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  @override
  Future<Either<Failure, User>> getUser(int id) async {
    try {
      final user = await remoteDataSource.getUser(id);
      return Right(user);
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }
}
```

### Domain Layer
```dart
// lib/domain/entities/user.dart
class User {
  final int id;
  final String name;
  final String email;

  User({
    required this.id,
    required this.name,
    required this.email,
  });
}

// lib/domain/repositories/user_repository.dart
abstract class UserRepository {
  Future<Either<Failure, User>> getUser(int id);
}

// lib/domain/usecases/get_user.dart
class GetUser {
  final UserRepository repository;

  GetUser(this.repository);

  Future<Either<Failure, User>> call(int id) {
    return repository.getUser(id);
  }
}
```

### Presentation Layer
```dart
// lib/presentation/bloc/user_bloc.dart
class UserBloc extends Bloc<UserEvent, UserState> {
  final GetUser getUser;

  UserBloc({required this.getUser}) : super(UserInitial()) {
    on<GetUserEvent>((event, emit) async {
      emit(UserLoading());
      final result = await getUser(event.id);
      result.fold(
        (failure) => emit(UserError(failure.message)),
        (user) => emit(UserLoaded(user)),
      );
    });
  }
}

// lib/presentation/pages/user_page.dart
class UserPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => UserBloc(
        getUser: GetUser(
          UserRepositoryImpl(
            remoteDataSource: UserRemoteDataSourceImpl(),
            localDataSource: UserLocalDataSourceImpl(),
          ),
        ),
      ),
      child: BlocBuilder<UserBloc, UserState>(
        builder: (context, state) {
          if (state is UserLoading) {
            return CircularProgressIndicator();
          } else if (state is UserLoaded) {
            return UserView(user: state.user);
          } else if (state is UserError) {
            return ErrorView(message: state.message);
          }
          return Container();
        },
      ),
    );
  }
}
```

## Dependency Injection

### Using GetIt
```dart
// lib/core/di/injection_container.dart
final sl = GetIt.instance;

Future<void> init() async {
  // Bloc
  sl.registerFactory(
    () => UserBloc(getUser: sl()),
  );

  // Use cases
  sl.registerLazySingleton(() => GetUser(sl()));

  // Repositories
  sl.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
    ),
  );

  // Data sources
  sl.registerLazySingleton<UserRemoteDataSource>(
    () => UserRemoteDataSourceImpl(),
  );
  sl.registerLazySingleton<UserLocalDataSource>(
    () => UserLocalDataSourceImpl(),
  );
}

// Usage in main.dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await init();
  runApp(MyApp());
}
```

## Routing

### Using Go Router
```dart
// lib/core/routes/app_router.dart
final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomePage(),
    ),
    GoRoute(
      path: '/user/:id',
      builder: (context, state) => UserPage(
        userId: int.parse(state.pathParameters['id']!),
      ),
    ),
  ],
);

// Usage in main.dart
MaterialApp.router(
  routerConfig: router,
)
```

## Theme Management

### Theme Configuration
```dart
// lib/core/theme/app_theme.dart
class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      primarySwatch: Colors.blue,
      brightness: Brightness.light,
      scaffoldBackgroundColor: Colors.white,
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      primarySwatch: Colors.blue,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: Colors.grey[900],
    );
  }
}

// Usage in main.dart
MaterialApp(
  theme: AppTheme.lightTheme,
  darkTheme: AppTheme.darkTheme,
  themeMode: ThemeMode.system,
)
```

## Localization

### Using Easy Localization
```dart
// lib/core/localization/app_localizations.dart
class AppLocalizations {
  static const supportedLocales = [
    Locale('en'),
    Locale('es'),
  ];

  static const localizationsDelegates = [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    EasyLocalization.of(context)!.delegate,
  ];
}

// Usage in main.dart
MaterialApp(
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
  locale: EasyLocalization.of(context)!.locale,
)
```

## Testing Structure

### Test Directory Organization
```
test/
  ├── core/
  │   ├── errors/
  │   └── utils/
  ├── data/
  │   ├── datasources/
  │   ├── models/
  │   └── repositories/
  ├── domain/
  │   ├── repositories/
  │   └── usecases/
  └── presentation/
      ├── bloc/
      ├── pages/
      └── widgets/
```

### Example Tests
```dart
// test/domain/usecases/get_user_test.dart
void main() {
  late GetUser usecase;
  late MockUserRepository mockUserRepository;

  setUp(() {
    mockUserRepository = MockUserRepository();
    usecase = GetUser(mockUserRepository);
  });

  final tId = 1;
  final tUser = User(id: tId, name: 'Test User', email: 'test@test.com');

  test(
    'should get user from the repository',
    () async {
      // arrange
      when(mockUserRepository.getUser(any))
          .thenAnswer((_) async => Right(tUser));

      // act
      final result = await usecase(tId);

      // assert
      expect(result, Right(tUser));
      verify(mockUserRepository.getUser(tId));
      verifyNoMoreInteractions(mockUserRepository);
    },
  );
}
```

## Best Practices

### 1. Follow Clean Architecture
- Separate concerns into layers
- Use dependency injection
- Follow SOLID principles
- Keep layers independent

### 2. Use Feature-First Organization
```
lib/
  ├── features/
  │   ├── auth/
  │   ├── home/
  │   └── profile/
  └── core/
```

### 3. Implement Error Handling
```dart
// lib/core/error/failures.dart
abstract class Failure {
  final String message;
  const Failure(this.message);
}

class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

class CacheFailure extends Failure {
  const CacheFailure(String message) : super(message);
}

// Usage
try {
  // Risky operation
} catch (e) {
  return Left(ServerFailure(e.toString()));
}
```

### 4. Use Constants
```dart
// lib/core/constants/app_constants.dart
class AppConstants {
  static const String appName = 'My App';
  static const String apiBaseUrl = 'https://api.example.com';
  static const int connectionTimeout = 30000;
}
```

### 5. Implement Logging
```dart
// lib/core/utils/logger.dart
class Logger {
  static void d(String message) {
    if (kDebugMode) {
      print('DEBUG: $message');
    }
  }

  static void e(String message) {
    if (kDebugMode) {
      print('ERROR: $message');
    }
  }
}
``` 