---
id: 06-introduction-to-firebase
title: Introduction to Firebase
sidebar_label: Introduction to Firebase
---

# Introduction to Firebase in Flutter

## Firebase Setup

### Adding Firebase to Flutter Project
1. Install the Firebase CLI
2. Install the FlutterFire CLI
3. Configure Firebase in your project

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Install FlutterFire CLI
dart pub global activate flutterfire_cli

# Login to Firebase
firebase login

# Configure Firebase in your project
flutterfire configure
```

### Dependencies
Add the following to your `pubspec.yaml`:
```yaml
dependencies:
  firebase_core: ^2.24.2
  firebase_auth: ^4.15.3
  cloud_firestore: ^4.13.6
  firebase_storage: ^11.5.6
```

## Firebase Authentication

### Email/Password Authentication
```dart
class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<UserCredential> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      return await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      throw Exception('Failed to sign in: $e');
    }
  }

  Future<UserCredential> createUserWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      return await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      throw Exception('Failed to create user: $e');
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}
```

### Social Authentication
```dart
class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  Future<UserCredential> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) throw Exception('Google sign in aborted');

      final GoogleSignInAuthentication googleAuth = 
          await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      return await _auth.signInWithCredential(credential);
    } catch (e) {
      throw Exception('Failed to sign in with Google: $e');
    }
  }
}
```

## Cloud Firestore

### Basic CRUD Operations
```dart
class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Create
  Future<void> createDocument(String collection, String docId, Map<String, dynamic> data) async {
    await _firestore.collection(collection).doc(docId).set(data);
  }

  // Read
  Future<DocumentSnapshot> getDocument(String collection, String docId) async {
    return await _firestore.collection(collection).doc(docId).get();
  }

  // Update
  Future<void> updateDocument(String collection, String docId, Map<String, dynamic> data) async {
    await _firestore.collection(collection).doc(docId).update(data);
  }

  // Delete
  Future<void> deleteDocument(String collection, String docId) async {
    await _firestore.collection(collection).doc(docId).delete();
  }
}
```

### Real-time Updates
```dart
class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Stream<QuerySnapshot> getCollectionStream(String collection) {
    return _firestore.collection(collection).snapshots();
  }

  Stream<DocumentSnapshot> getDocumentStream(String collection, String docId) {
    return _firestore.collection(collection).doc(docId).snapshots();
  }
}

// Usage in widget
StreamBuilder<QuerySnapshot>(
  stream: FirestoreService().getCollectionStream('users'),
  builder: (context, snapshot) {
    if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    }

    if (snapshot.connectionState == ConnectionState.waiting) {
      return CircularProgressIndicator();
    }

    return ListView.builder(
      itemCount: snapshot.data!.docs.length,
      itemBuilder: (context, index) {
        final doc = snapshot.data!.docs[index];
        return ListTile(
          title: Text(doc['name']),
          subtitle: Text(doc['email']),
        );
      },
    );
  },
)
```

## Firebase Storage

### Upload Files
```dart
class StorageService {
  final FirebaseStorage _storage = FirebaseStorage.instance;

  Future<String> uploadFile(String path, File file) async {
    try {
      final ref = _storage.ref().child(path);
      final uploadTask = ref.putFile(file);
      final snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      throw Exception('Failed to upload file: $e');
    }
  }

  Future<void> deleteFile(String path) async {
    try {
      final ref = _storage.ref().child(path);
      await ref.delete();
    } catch (e) {
      throw Exception('Failed to delete file: $e');
    }
  }
}
```

### Download Files
```dart
class StorageService {
  final FirebaseStorage _storage = FirebaseStorage.instance;

  Future<File> downloadFile(String path, String localPath) async {
    try {
      final ref = _storage.ref().child(path);
      final file = File(localPath);
      await ref.writeToFile(file);
      return file;
    } catch (e) {
      throw Exception('Failed to download file: $e');
    }
  }

  Future<String> getDownloadUrl(String path) async {
    try {
      final ref = _storage.ref().child(path);
      return await ref.getDownloadURL();
    } catch (e) {
      throw Exception('Failed to get download URL: $e');
    }
  }
}
```

## Firebase Cloud Functions

### Writing Cloud Functions
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.firestore().collection('users').doc(user.uid).set({
      email: user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user document:', error);
  }
});
```

### Calling Cloud Functions
```dart
class CloudFunctionsService {
  final FirebaseFunctions _functions = FirebaseFunctions.instance;

  Future<dynamic> callFunction(String name, Map<String, dynamic> data) async {
    try {
      final result = await _functions.httpsCallable(name).call(data);
      return result.data;
    } catch (e) {
      throw Exception('Failed to call function: $e');
    }
  }
}
```

## Firebase Analytics

### Tracking Events
```dart
class AnalyticsService {
  final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  Future<void> logEvent({
    required String name,
    Map<String, dynamic>? parameters,
  }) async {
    await _analytics.logEvent(
      name: name,
      parameters: parameters,
    );
  }

  Future<void> setUserProperty({
    required String name,
    required String value,
  }) async {
    await _analytics.setUserProperty(
      name: name,
      value: value,
    );
  }
}
```

### Screen Tracking
```dart
class AnalyticsService {
  final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  Future<void> setCurrentScreen(String screenName) async {
    await _analytics.setCurrentScreen(
      screenName: screenName,
    );
  }
}

// Usage in widget
class MyScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    AnalyticsService().setCurrentScreen('my_screen');
    return Scaffold(
      // ...
    );
  }
}
```

## Firebase Cloud Messaging

### Setup
```dart
class MessagingService {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  Future<void> initialize() async {
    // Request permission
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      // Get FCM token
      String? token = await _messaging.getToken();
      print('FCM Token: $token');
    }
  }

  // Handle background messages
  static Future<void> _firebaseMessagingBackgroundHandler(
    RemoteMessage message,
  ) async {
    print('Handling background message: ${message.messageId}');
  }
}
```

### Handling Messages
```dart
class MessagingService {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  void setupForegroundHandler() {
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('Got a message whilst in the foreground!');
      print('Message data: ${message.data}');

      if (message.notification != null) {
        print('Message also contained a notification: ${message.notification}');
      }
    });

    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      print('A new onMessageOpenedApp event was published!');
      print('Message data: ${message.data}');
    });
  }
}
```

## Best Practices

### 1. Error Handling
```dart
class FirebaseService {
  Future<void> handleError(Future<void> Function() operation) async {
    try {
      await operation();
    } on FirebaseAuthException catch (e) {
      switch (e.code) {
        case 'user-not-found':
          throw Exception('No user found for that email.');
        case 'wrong-password':
          throw Exception('Wrong password provided.');
        default:
          throw Exception('Authentication error: ${e.message}');
      }
    } catch (e) {
      throw Exception('Operation failed: $e');
    }
  }
}
```

### 2. Offline Persistence
```dart
class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> enableOfflinePersistence() async {
    await _firestore.enablePersistence();
  }
}
```

### 3. Security Rules
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### 4. Performance Optimization
```dart
class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<QuerySnapshot> getPaginatedData(
    String collection,
    DocumentSnapshot? lastDocument,
    int limit,
  ) async {
    Query query = _firestore.collection(collection).limit(limit);
    
    if (lastDocument != null) {
      query = query.startAfterDocument(lastDocument);
    }

    return await query.get();
  }
}
```

### 5. Caching
```dart
class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<DocumentSnapshot> getCachedDocument(
    String collection,
    String docId,
  ) async {
    return await _firestore
        .collection(collection)
        .doc(docId)
        .get(GetOptions(source: Source.cache));
  }
}
``` 