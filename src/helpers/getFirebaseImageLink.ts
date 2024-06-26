const getFirebaseImageLink = (imageName: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/dream-diary-3e6e0.appspot.com/o/${imageName}?alt=media&token=9f980753-9e68-413d-bee2-0db556283f12`;
};

const getNameFromFirebaseLink = (link: string) => {
  return link.split('o/')[1].split('?')[0];
};

export { getFirebaseImageLink, getNameFromFirebaseLink };
