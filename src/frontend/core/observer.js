const store = {}

/**
 * 상태를 구독한다(리렌더링 함수를 옵저버로 등록.
 * @param {string} key 구독할 key
 * @param {function} observer 변화 감지 후 실행시킬 함수(리렌더링 함수)
 * @returns
 */
const subscribe = (key, observer) => store[key]._observers.add(observer)

/**
 * 해당 리렌더링 함수를 제거한다.
 * @param {string} key 구독할 key
 * @param {function} observer 리렌더링 함수
 */
const unsubscribe = (key, observer) => {
  store[key]._observers = [...store[key]._observers].filter((subscriber) => subscriber !== observer)
}

/**
 * 옵저버 함수를 실행한다.
 * @param {string} key 해당 key의 옵저버 함수를 실행시킨다.
 */
const notify = (key) => store[key]._observers.forEach((observer) => observer())

/**
 * store 객체에 전역 상태를 추가한다.
 * @param {{key, defaultValue}} key 전역 상태 key, defaultValue 전역 상태 밸류
 * @returns {string} 키를 반환함
 */
const initState = ({ key, defaultValue }) => {
  store[key] = {
    _state: defaultValue,
    _observers: new Set(),
  }
  return key
}

/**
 * 해당 key의 상태 값을 불러온다.
 * @param {string} key 전역 상태 key
 * @returns {any} store[key]._state 상태 value
 */
const getState = (key) => {
  return store[key]._state
}

/**
 * 해당 key의 상태를 수정하고, notify로 옵저버 함수(리렌더링 함수)를 실행시킨다.
 * @param {string} key 전역 상태 key
 */
const setState = (key) => (newState) => {
  store[key]._state = newState
  notify(key)
}

export { subscribe, unsubscribe, initState, getState, setState }
