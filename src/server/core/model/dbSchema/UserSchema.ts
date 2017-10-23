import UserSexEnum from '../../consts/enum/UserSex';

export const attributes = {
    /**
     * Unique account of the user.
    */
    account: {
        type: String,
        index: true,
        unique: true,
        rquired: true,
    },

    /**
     * nickName of the user.
    */
    nickName: {
        type: String,
        rquired: true,
    },

    /**
     * password by md5 of the user.
    */
    password: {
        type: String,
        rquired: true,
    },

    /**
     * sex of the user.
    */
    sex: {
        type: String,
        default: UserSexEnum.unknown,
    },

    /**
     * headimg url of the user.
    */
    avatar: String,

    /**
     * province of the user.
    */
    province: String,

    /**
     * city of the user.
    */
    city: String,

    /**
     * country of the user.
    */
    country: String,

    /**
     * sdkId of the user.
    */
    sdkId: Number,
};

export const opts = {

};
