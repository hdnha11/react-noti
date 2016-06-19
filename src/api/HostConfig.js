const host = {
  rootUrl: 'http://localhost',
  port: 8888
};

export function getHostUrl() {
  return `${host.rootUrl}:${host.port}`;
}
