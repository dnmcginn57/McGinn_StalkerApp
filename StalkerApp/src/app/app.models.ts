// Contains the format fot the documents in the database

export interface User {
    email: string;
    name: string;
    time: string;
  }
  
  export interface Chat {
    message: string;
    pair: string;
    sender: string;
    time: number;
  }