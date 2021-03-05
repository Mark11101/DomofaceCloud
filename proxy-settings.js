module.exports = {
  // run react-dev-server (true) or serve build (false)
  dev: true,
  // whether to open the react site in a browser at start
  openInBrowser: true,
  // path to your own backend api
  // (set to empty string if yo don't have an internal JS-based api)
  pathToAPI: '',
  // the host for your backend api 
  // set to another machine if your api is not local  
  hostForAPI: 'domoface.ru',
  // the ports
  ports: {
    // where you want to run the 'joint' proxied server
    main: 3009,
    // where you want to run the react-dev-server
    react: 3465,
    // where you serve your api (make sure to serve it on that port)
    api: 0
  },
  // a path to an optional script to run after builds
  postBuildScript: './postBuildScript.js',
  // a function that should return true if the backend-api 
  // is to handle the request (add your own logic here as needed)
  handleWithAPI(url) {
    return url.indexOf('/api/') === 0;
  }
};
