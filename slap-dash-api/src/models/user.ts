export interface User {
  id: number;
  name: string; // not going to enforce this to be unique but probably should be
  // ipAddress: string; // ip address of the user - this will be used to track the user and to potentially prevent spam
  // primaryIdentityId: // if allowing for exising user login stuff
};
