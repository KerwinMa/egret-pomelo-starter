import UserSexEnum from '../enum/UserSex';

export default class UserVo {
    /**
     * Unique id key of the user.
    */
    id: string;

    /**
     * nickName of the user.
    */
    nickName: string;
    /**
     * password by md5 of the user.
    */
    password: string
    /**
     * sex of the user.
    */
    sex: UserSexEnum;
    /**
     * headimg url of the user.
    */
    avatar: string;
    /**
     * province of the user.
    */
    province: string;
    /**
     * city of the user.
    */
    city: string;
    /**
     * country of the user.
    */
    country: string;

    /**
     * Return the complete address for this user.
     *
     * @return
     * 		The complete address for this user.
     */
    getFullAddress (): string {
        return `${this.province}-${this.city}-${this.country}`
    }
}
