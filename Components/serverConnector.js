export async function getAllTestFromNet() {
  try {
    const response = await fetch('https://tgryl.pl/quiz/tests');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getFromServerError: ' + error.message);
  }
}
export async function getTestFromNet(id) {
  try {
    const response = await fetch('https://tgryl.pl/quiz/test/' + id);
    const test = await response.json();
    return test;
  } catch (error) {
    console.error('getFromServerError: ' + error.message);
  }
}
export async function getRandomTestIdFromNet() {
  try {
    const response = await fetch('https://tgryl.pl/quiz/tests');
    const json = await response.json();
    let l = json.length;
    let randomNumber = Math.floor(Math.random() * l);
    console.log('download test:' + json[randomNumber].id);
    return json[randomNumber].id.toString();
  } catch (error) {
    console.error('getFromServerError: ' + error.message);
  }
}
