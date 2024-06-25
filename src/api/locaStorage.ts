class LocalStorageService {
  static setUID(uid: string) {
    localStorage.setItem('uid', uid);
  }

  static removeUID() {
    localStorage.removeItem('uid');
  }

  static checkUID() {
    return localStorage.getItem('uid') !== null;
  }

  static getUID() {
    return localStorage.getItem('uid') || '';
  }
}

export { LocalStorageService };
