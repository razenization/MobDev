import * as SQLite from 'expo-sqlite';

export const connection = SQLite.openDatabase(
  'AppDatabase.db',
  '1.0',
  'App Database',
  200000,
);
