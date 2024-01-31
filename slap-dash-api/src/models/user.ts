export type User = {
  id: string; // guid
  name: string; // not going to inforce this to be unique
  ipAddress: string; // ip address of the user - this will be used to track the user and to potentially prevent spam
};
