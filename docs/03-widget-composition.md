---
id: 03-widget-composition
title: Widget Composition
sidebar_label: Widget Composition
---

# Widget Composition in Flutter

## Introduction to Widget Composition

### What is Widget Composition?
Widget composition is the process of building complex UIs by combining simpler widgets. It's a fundamental concept in Flutter that promotes code reuse and maintainability.

### Benefits
- Code reusability
- Better maintainability
- Easier testing
- Improved readability
- Separation of concerns

## Basic Composition Patterns

### Extracting Widgets
```dart
// Before
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            child: Text('Header'),
          ),
          Container(
            padding: EdgeInsets.all(16),
            child: Text('Content'),
          ),
        ],
      ),
    );
  }
}

// After
class Header extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Text('Header'),
    );
  }
}

class Content extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Text('Content'),
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Header(),
          Content(),
        ],
      ),
    );
  }
}
```

### Custom Widgets
```dart
class CustomCard extends StatelessWidget {
  final String title;
  final String content;
  final VoidCallback? onTap;

  const CustomCard({
    Key? key,
    required this.title,
    required this.content,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.headline6,
              ),
              SizedBox(height: 8),
              Text(content),
            ],
          ),
        ),
      ),
    );
  }
}

// Usage
CustomCard(
  title: 'My Card',
  content: 'This is the content',
  onTap: () => print('Card tapped'),
)
```

## Advanced Composition Patterns

### Builder Pattern
```dart
class CustomBuilder extends StatelessWidget {
  final Widget Function(BuildContext context) builder;

  const CustomBuilder({
    Key? key,
    required this.builder,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      child: builder(context),
    );
  }
}

// Usage
CustomBuilder(
  builder: (context) => Text('Custom content'),
)
```

### Composition with State
```dart
class StatefulCard extends StatefulWidget {
  final String title;
  final String content;

  const StatefulCard({
    Key? key,
    required this.title,
    required this.content,
  }) : super(key: key);

  @override
  _StatefulCardState createState() => _StatefulCardState();
}

class _StatefulCardState extends State<StatefulCard> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          ListTile(
            title: Text(widget.title),
            trailing: IconButton(
              icon: Icon(_isExpanded ? Icons.expand_less : Icons.expand_more),
              onPressed: () {
                setState(() {
                  _isExpanded = !_isExpanded;
                });
              },
            ),
          ),
          if (_isExpanded)
            Padding(
              padding: EdgeInsets.all(16),
              child: Text(widget.content),
            ),
        ],
      ),
    );
  }
}
```

## Layout Composition

### Responsive Layout
```dart
class ResponsiveLayout extends StatelessWidget {
  final Widget mobile;
  final Widget tablet;
  final Widget desktop;

  const ResponsiveLayout({
    Key? key,
    required this.mobile,
    required this.tablet,
    required this.desktop,
  }) : super(key: key);

  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 650;

  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width >= 650 &&
      MediaQuery.of(context).size.width < 1100;

  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= 1100;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1100) {
          return desktop;
        } else if (constraints.maxWidth >= 650) {
          return tablet;
        } else {
          return mobile;
        }
      },
    );
  }
}
```

### Flexible Layout
```dart
class FlexibleLayout extends StatelessWidget {
  final List<Widget> children;
  final int columns;

  const FlexibleLayout({
    Key? key,
    required this.children,
    this.columns = 2,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final itemWidth = width / columns;
        
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: children.map((child) {
            return SizedBox(
              width: itemWidth,
              child: child,
            );
          }).toList(),
        );
      },
    );
  }
}
```

## Theme Composition

### Custom Theme
```dart
class CustomTheme {
  static ThemeData lightTheme = ThemeData(
    primarySwatch: Colors.blue,
    brightness: Brightness.light,
    cardTheme: CardTheme(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  );

  static ThemeData darkTheme = ThemeData(
    primarySwatch: Colors.blue,
    brightness: Brightness.dark,
    cardTheme: CardTheme(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  );
}

// Usage
MaterialApp(
  theme: CustomTheme.lightTheme,
  darkTheme: CustomTheme.darkTheme,
  home: MyApp(),
)
```

### Theme Extension
```dart
class CustomColors extends ThemeExtension<CustomColors> {
  final Color primary;
  final Color secondary;
  final Color accent;

  CustomColors({
    required this.primary,
    required this.secondary,
    required this.accent,
  });

  @override
  ThemeExtension<CustomColors> copyWith({
    Color? primary,
    Color? secondary,
    Color? accent,
  }) {
    return CustomColors(
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      accent: accent ?? this.accent,
    );
  }

  @override
  ThemeExtension<CustomColors> lerp(
    ThemeExtension<CustomColors>? other,
    double t,
  ) {
    if (other is! CustomColors) {
      return this;
    }
    return CustomColors(
      primary: Color.lerp(primary, other.primary, t)!,
      secondary: Color.lerp(secondary, other.secondary, t)!,
      accent: Color.lerp(accent, other.accent, t)!,
    );
  }
}

// Usage
ThemeData(
  extensions: [
    CustomColors(
      primary: Colors.blue,
      secondary: Colors.green,
      accent: Colors.orange,
    ),
  ],
)
```

## Best Practices

### 1. Keep Widgets Small and Focused
```dart
// Good
class UserAvatar extends StatelessWidget {
  final String imageUrl;
  final double size;

  const UserAvatar({
    Key? key,
    required this.imageUrl,
    this.size = 40,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: size / 2,
      backgroundImage: NetworkImage(imageUrl),
    );
  }
}

// Bad
class ComplexWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          // Too many nested widgets and responsibilities
        ],
      ),
    );
  }
}
```

### 2. Use const Constructors
```dart
// Good
const MyWidget({
  Key? key,
  required this.title,
}) : super(key: key);

// Bad
MyWidget({
  Key? key,
  required this.title,
}) : super(key: key);
```

### 3. Extract Common Styles
```dart
class AppStyles {
  static const TextStyle headingStyle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle bodyStyle = TextStyle(
    fontSize: 16,
  );
}

// Usage
Text(
  'Heading',
  style: AppStyles.headingStyle,
)
```

### 4. Use Composition Over Inheritance
```dart
// Good
class CustomButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget child;
  final ButtonStyle? style;

  const CustomButton({
    Key? key,
    required this.onPressed,
    required this.child,
    this.style,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: style,
      child: child,
    );
  }
}

// Bad
class CustomButton extends ElevatedButton {
  // Avoid extending existing widgets unless necessary
}
``` 