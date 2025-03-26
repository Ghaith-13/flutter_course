import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'training-program',
      label: 'Flutter Training Program',
    },
    {
      type: 'doc',
      id: 'flutter-training-program-overview',
      label: 'Program Overview',
    },
   
    {
      type: 'category',
      label: 'Learning Materials',
      items: [
        {
          type: 'doc',
          id: 'learning-path',
          label: 'Learning Path',
        },
        {
          type: 'doc',
          id: '01-dart-essentials',
          label: 'Dart Essentials',
        },
        {
          type: 'doc',
          id: '02-flutter-basics',
          label: 'Flutter Basics',
        },
        {
          type: 'doc',
          id: '03-widget-composition',
          label: 'Widget Composition',
        },
        {
          type: 'doc',
          id: '04-state-management',
          label: 'State Management',
        },
        {
          type: 'doc',
          id: '05-application-structure',
          label: 'Application Structure',
        },
        {
          type: 'doc',
          id: '06-introduction-to-firebase',
          label: 'Introduction to Firebase',
        },
        {
          type: 'doc',
          id: '07-type-safety-in-dart',
          label: 'Type Safety in Dart',
        }
      ]
    },
     {
      type: 'category',
      label: 'Assessment Tasks',
      items: [
        {
          type: 'doc',
          id: 'flutter-exercise',
          label: 'Flutter Exercise',
        },
        {
          type: 'doc',
          id: 'flutter_component_assessment',
          label: 'Flutter Component Assessment',
        },
        {
          type: 'doc',
          id: 'flutter_hooks_assessment',
          label: 'Flutter State Management Assessment',
        },
        {
          type: 'doc',
          id: 'flutter_todo_app_project',
          label: 'Todo App Project',
        }
      ]
    },
  ]
};

export default sidebars;
