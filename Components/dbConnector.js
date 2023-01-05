import {openDatabase} from 'react-native-sqlite-storage';

export const db = openDatabase(
  {name: 'tests'},
  () => {
    console.log('success');
  },
  error => {
    console.log('opening error: ' + error.message);
  },
);
export function crateTable() {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS tests( id  TEXT primary key unique NOT NULL,tags TEXT,name TEXT,description TEXT,level TEXT,number_of_tasks INTEGER);',
      [],
      () => {
        console.log('succes in creation');
      },
      error => {
        console.log('Creating error ' + error.message);
      },
    );
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS test (id TEXT PRIMARY KEY unique NOT NULL,tags TEXT,tasks TEXT,name TEXT,description TEXT,level TEXT);',
      [],
      () => {
        console.log('succes in creation');
      },
      error => {
        console.log('Creating error ' + error.message);
      },
    );
  });
}

export async function getDatabase() {
  const query = 'select * from tests';
  let tests = '[';
  let i = 0;
  db.transaction(async txn => {
    await txn.executeSql(
      query,
      [],
      (transaction, resultSet) => {
        for (var i = 0; i < resultSet.rows.length; i++) {
          tests = tests + JSON.stringify(resultSet.rows.item(i));
          if (i < resultSet.rows.length - 1) {
            tests = tests + ',';
          }
        }
        tests = tests + ']';
        return JSON.parse(tests);
      },
      error => {
        console.log('Inserting error: ' + error.message);
      },
    );
  });
}
export function insertTestsIntoDatabase(json) {
  const query =
    'Insert OR IGNORE into tests (id,name,description,tags,level,number_of_tasks) VALUES (?,?,?,?,?,?);';
  db.transaction(async txn => {
    for (const test of json) {
      await txn.executeSql(
        query,
        [
          test.id.toString(),
          test.name.toString(),
          test.description.toString(),
          test.tags.toString(),
          test.level.toString(),
          parseInt(test.numberOfTasks),
        ],
        () => {
          console.log('succes Insert');
        },
        error => {
          console.log('Inserting error: ' + error.message);
        },
      );
    }
  });
}
export function insertDetailsOfTestIntoDatabase(test) {
  const query2 =
    'Insert OR IGNORE into test (id,name,description,tags,level,tasks) VALUES (?,?,?,?,?,?);';
  db.transaction(async txn => {
    await txn.executeSql(
      query2,
      [
        test.id.toString(),
        test.name.toString(),
        test.description.toString(),
        test.tags.toString(),
        test.level.toString(),
        JSON.stringify(test.tasks),
      ],
      () => {
        console.log('succes Insert');
      },
      error => {
        console.log('Inserting error: ' + error.message);
      },
    );
  });
}
