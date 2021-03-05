const envConfig = {
  baseUrl: 'https://domoface.ru',
  windowResizeDebounceTime: 600,
}

class Config {
  windowResizeDebounceTime;

  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.windowResizeDebounceTime = data.windowResizeDebounceTime;
  }

  set(key, value) {
    if (value) {
      (this[key]) = value;
    }
  }
}

const config = new Config(envConfig);

export default config
