import * as puremvc from 'puremvc';

import NotificationName from '../consts/NotificationName';

import UserSignUpCommand from './userController/UserSignUpCommand';
import UserSignInCommand from './userController/UserSignInCommand';
import AuthCommand from './authController/AuthCommand';

export default class ControllerPrepCommand extends puremvc.SimpleCommand {

    /**
     * @override
     */
    public execute (note: puremvc.INotification): void {

        this.facade.registerCommand(NotificationName.USER_SIGNUP, UserSignUpCommand);
        this.facade.registerCommand(NotificationName.USER_SIGNIN, UserSignInCommand);
        this.facade.registerCommand(NotificationName.AUTH, AuthCommand);
        
    }
}
