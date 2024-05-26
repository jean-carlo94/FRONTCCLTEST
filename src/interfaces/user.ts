export interface IUser {
    id?:                        number;
    name:                       string;
    email:                      string;
    password?:                  string;
    password_confirmation?:     string;
    token?:                     string;
}

export interface RegisterIUser extends IUser {}

export interface LoginIUser {
    email:      string;
    password:   string;
}