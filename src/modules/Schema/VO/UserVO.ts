export default class UserVo {
    /**
     * Unique id key of the user.
    */
    id: string;

    /**
     * Unique account of the user.
    */
    account: string;
    /**
     * nickName of the user.
    */
    nickName: string;
    /**
     * password by md5 of the user.
    */
    password: string;
    /**
     * sex of the user.
    */
    sex: string;
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
     * sdkId of the user.
    */
    sdkId: number;

    constructor (data: any) {
        this.id = data.id;
        this.nickName = data.nickName;
        this.password = data.password;
        this.sex = data.sex;
        this.avatar = data.avatar;
        this.province = data.province;
        this.city = data.city;
        this.country = data.country;
    }

    /**
     * Return the complete address for this user.
     *
     * @return
     * 		The complete address for this user.
     */
    getFullAddress (): string {
        return `${this.province}-${this.city}-${this.country}`;
    }
}
