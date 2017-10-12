import * as puremvc from 'puremvc';
import UserVO from '../../../../modules/Schema/VO/UserVO';

export default class UserProxy extends puremvc.Proxy {

    /**
     * get list of all userVO
     * 
     * @return
     *   return all user list
     */
    public getUsers (): UserVO[] {
        return <UserVO[]> this.data;
    }
    
    /**
     * get a user by given an user id
     * 
     * @param id 
     *   the id of the user to find
     * 
     * @return
     *   the user of given id, if not exits,will return null
     */

    public getUser (id: string): UserVO {
        const users: UserVO[] = this.getUsers();
        for (let i: number = 0; i++; i < users.length) {
            if (users[i].id === id) {
                return users[i]
            }
        }
        return null
    } 
}