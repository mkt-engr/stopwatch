const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milli_seconds = document.getElementById('milli_seconds');

const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

// ストップウォッチを動かすときに用いるsetIntervalの返り値
let timer_id;

// ストップウォッチを動かし始めてからの時間
let stopwatch_time = 0;

// STARTボタンを押した時間
let press_start_time = 0;

// STOPボタンを押した時間
let press_stop_time = 0;

//ストップウォッチが動いていた時間の合計（STARTボタンを押してからSTOPボタンを押すまでの時間の合計）
let past_moving_time = 0;

start.addEventListener('click', () => {
  press_start_time = new Date().getTime();
  timer_id = setInterval(() => {
    stopwatch_time = new Date().getTime() - press_start_time + past_moving_time;

    const time_milli_seconds = `00${stopwatch_time % 1000}`.slice(-3);
    const time_seconds = `0${Math.floor((stopwatch_time / 1000) % 60)}`.slice(
      -2
    );
    const time_minutes = `0${
      Math.floor(stopwatch_time / 1000 / 60) % 60
    }`.slice(-2);
    const time_hours = `0${Math.floor(stopwatch_time / 1000 / 60 / 60)}`.slice(
      -2
    );

    //ブラウザに時間を描画する
    hours.innerHTML = time_hours;
    minutes.innerHTML = time_minutes;
    seconds.innerHTML = time_seconds;
    milli_seconds.innerHTML = time_milli_seconds;
  }, 1);

  //スタートボタンを押したらストップしか押せないようにする
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = true;
});

stop.addEventListener('click', () => {
  clearInterval(timer_id);
  start.innerHTML = 'restart';

  press_stop_time = new Date().getTime();
  past_moving_time += press_stop_time - press_start_time;

  //stopボタンをstopボタンを押せないようにする、かつスタートとリセットは押せるようにする
  stop.disabled = true;
  start.disabled = false;
  reset.disabled = false;
});

reset.addEventListener('click', () => {
  clearInterval(timer_id);

  start.innerHTML = 'start';

  //ブラウザの表示を初期化
  minutes.innerHTML = '00';
  seconds.innerHTML = '00';
  milli_seconds.innerHTML = '000';

  //変数を初期化
  stopwatch_time = 0;
  press_start_time = 0;
  press_stop_time = 0;
  past_moving_time = 0;

  //resetを押したらスタートボタンしか押せない状態にする
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = true;
});
